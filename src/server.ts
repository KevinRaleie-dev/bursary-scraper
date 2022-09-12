import "dotenv/config";
import { app } from "./app";

// eslint-disable-next-line require-jsdoc
function server() {
  const PORT = process.env.PORT || 5000;
  const serverURL = `http://localhost:${PORT}`;

  app.listen(PORT, () => {
    console.info(`Server is running on ${serverURL}`);
  });
}

server();
