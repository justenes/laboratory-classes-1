// 🏗 Stwórz funkcję 'homeRouting', która obsłuży stronę główną.
function homeRouting(method, response){
    response.setHeader("Content-Type", "text/html");

// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();
return response.end(`
    <html>
      <head><title>Shop – Home</title></head>
      <body>
        <h1>Home</h1>
        <nav>
          <a href="/product/add">Add product</a><br>
          <a href="/product/new">Newest product</a><br>
          <a href="/logout">Logout</a>
        </nav>
      </body>
    </html>
  `);
}

// 🔧 Wyeksportuj funkcję 'homeRouting', aby inne moduł mogły jej używać.
module.exports = { homeRouting };
