// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const fs = require('fs');
const path = require('path');
const { STATUS_CODE } = require('../constants/statusCode');


// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.

// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.
function renderAddProductPage(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`
      <html>
        <head><title>Shop – Add product</title></head>
        <body>
          <h1>Add product</h1>
          <form method="POST" action="/product/add">
            <label>Name: <input type="text" name="name" /></label><br>
            <label>Description: <input type="text" name="description" /></label><br>
            <button type="submit">Add</button>
          </form>
          <nav>
            <a href="/">Home</a><br>
            <a href="/product/new">Newest product</a><br>
            <a href="/logout">Logout</a>
          </nav>
        </body>
      </html>
    `);
  }
  
// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);
function renderNewProductPage(response) {
    fs.readFile(path.join(__dirname, '../product.txt'), 'utf-8', (err, data) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      if (err || !data) {
        return response.end(`
          <html><head><title>Shop – Newest product</title></head><body>
            <h1>Newest product</h1><p>No products found.</p>
            <nav><a href="/">Home</a><br><a href="/product/add">Add product</a><br><a href="/logout">Logout</a></nav>
          </body></html>
        `);
      } else {
        return response.end(`
          <html><head><title>Shop – Newest product</title></head><body>
            <h1>Newest product</h1><p>${data}</p>
            <nav><a href="/">Home</a><br><a href="/product/add">Add product</a><br><a href="/logout">Logout</a></nav>
          </body></html>
        `);
      }
    });
  }

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");
function addNewProduct(request, response) {
    let body = [];
  
    request.on('data', chunk => {
      body.push(chunk);
    });
  
    request.on('end', () => {
      body = Buffer.concat(body).toString();
      const parsed = new URLSearchParams(body);
      const name = parsed.get('name');
      const description = parsed.get('description');
      const content = `Name: ${name}, Description: ${description}`;
  
      fs.writeFile(path.join(__dirname, '../product.txt'), content, err => {
        if (err) {
          response.writeHead(500);
          response.end('Error saving product.');
          return;
        }
        response.writeHead(STATUS_CODE.FOUND, { Location: '/product/new' });
        response.end();
      });
    });
  }
  

  function productRouting(url, method, request, response) {
    if (url === '/product/add' && method === 'GET') {
      renderAddProductPage(response);
    } else if (url === '/product/add' && method === 'POST') {
      addNewProduct(request, response);
    } else if (url === '/product/new') {
      renderNewProductPage(response);
    } else {
      const date = new Date().toISOString();
      console.log(`ERROR [${date}]: requested url ${url} doesn’t exist.`);
      response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
      response.end('<h1>404 Not Found</h1>');
    }
  }

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
module.exports = { productRouting };