const { BodyMixin } = require("undici-types");

// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
function logoutRouting(method, response){

// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
response.setHeader('Content-Type', "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();
return response.end(`
    <html>
      <head><title>Shop – Logout</title></head>
      <body>
        <h1>Logout</h1>
        <nav>
          <a href="/">Home</a><br>
          <a href="/kill">Logout from application</a>
        </nav>
      </body>
    </html>
  `);
}
// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.
module.exports = { logoutRouting };