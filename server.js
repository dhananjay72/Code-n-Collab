const http = require("http");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

server.listen(port, () => {
  console.log("server is running");
});
