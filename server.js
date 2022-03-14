const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8000;
const connectToMongoDB = require("./config/DB");
const server = http.createServer(app);

connectToMongoDB();

const startServer = async () => {
  server.listen(PORT, () => {
    console.log(`Server Listening on Port: ${PORT}`);
  });
};

startServer();
