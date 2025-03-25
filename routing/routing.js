// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
const { homeRouting } = require('./home');
const { productRouting } = require('./product');
const { logoutRouting } = require('./logout');

// 📦 Zaimportuj obiekt STATUS_CODE.
const { STATUS_CODE } = require('../constants/statusCode');

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
const requestRouting = (request, response) => {
  const { url, method } = request;
  const date = new Date().toISOString();

  // 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
  console.log(`INFO [${date}]: ${method} – ${url}`);

  // 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.
  if (url === '/') {
    homeRouting(method, response);
  } else if (url.startsWith('/product')) {
    productRouting(url, method, request, response);
  } else if (url === '/logout') {
    logoutRouting(method, response);
  }
  // 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
  else if (url === '/kill') {
    // 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.
    console.log(`PROCESS [${date}]: logout has been inititated and application will be closed`);
    response.end('Server is shutting down');
    process.exit();
  }
  // 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
  else {
    // 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
    console.log(`ERROR [${date}]: requested url ${url} doesn’t exist.`);
    response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
    response.end('<h1>404 Not Found</h1>');
  }
};

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = { requestRouting };
