const express = require("express");
const serveStatic = require("serve-static");

const server = express();

server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");

const users = [
  { name: "Arthur", id: 1 },
  { name: "Mauricio", id: 2 },
];

server.get("/", (req, res) => {
  res.render("home", {
    title: "Another Title",
    subtitle: "subtitle",
    users,
  });
});

server.post("/users", (req, res) => {
  console.log("new user request");
  console.log("body", req.body);
  const newUser = req.body.name;
  users.push({ name: newUser, id: users.length + 1 });
  res.redirect("/");
});

server.listen(3001, () => console.log("server on 3001"));
