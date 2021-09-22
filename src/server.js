const app = require('./main');

(async function server() {
  const PORT = 4000;
  const serverURL = `http://localhost:${PORT}`;

  app.listen(PORT, () => {
    console.log(`Server is running on ${serverURL}`);
  });
})();
