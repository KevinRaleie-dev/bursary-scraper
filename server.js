require('dotenv/config');
const app = require('./src/app');

// eslint-disable-next-line require-jsdoc
function server() {
  const PORT = process.env.PORT || 5000;
  const serverURL = `http://localhost:${PORT}`;

  app.listen(PORT, () => {
    console.log(`Server is running on ${serverURL}`);
  });
}

server();
