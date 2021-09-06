const express = require('express');
const bursary = require('./routes/bursary.route');

(async function main() {
  const app = express();
  const PORT = 5000;
  const serverURL = `http://localhost:${PORT}`;

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use('/', bursary);

  app.listen(PORT, () => {
    console.log(`Server started at ${serverURL}`);
  });
})();
