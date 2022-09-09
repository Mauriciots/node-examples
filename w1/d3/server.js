const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const server = express();

const logger = (req, res, next) => {
  console.log("Logging...");
  next();
};

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(logger);

// server.get("/", logger, (req, res) => {
//   res.send("Users");
// });
server.get("/", logger, (request, response) => {
  console.log("request received");
  response.send("Home");
});

server.post("/users", (request, response) => {
  console.log("body", request.body);
  response.send("user created");
});

// GET /users/:id
server.get("/users/:banana", (req, res) => {
  console.log("users/:id", req.params);
  res.send("User detail");
});

server.listen(3001, () => console.log("server running on port 3001"));
