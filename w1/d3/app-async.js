const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { getAll, create, update, remove } = require("./usersController");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/users", async (_req, res) => {
  const users = await getAll();
  res.status(200);
  res.send({ users });
});

app.post("/users", async (req, res) => {
  await create(req.body);
  res.status(201);
  res.send();
});

app.put("/users", async (req, res) => {
  await update(req.body);
  res.status(204);
  res.send();
});

app.delete("/users", async (req, res) => {
  await remove(req.body.id);
  res.status(204);
  res.send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
