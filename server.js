require('dotenv/config');
const app = require('./src/main');

(async function server() {
  const PORT = process.env.PORT || 5000;
  const serverURL = `http://localhost:${PORT}`;

  app.listen(PORT, () => {
    console.log(`Server is running on ${serverURL}`);
  });
})();
