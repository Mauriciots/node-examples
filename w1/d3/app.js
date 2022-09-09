const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const fileName = "users.json";
const encoding = "utf8";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/users", (_req, res) => {
  fs.readFile(fileName, encoding, (err, data) => {
    if (err) throw err;
    const { users } = JSON.parse(data);
    res.status(200);
    res.send({ users });
  });
});

app.post("/users", (req, res) => {
  fs.readFile(fileName, encoding, (err, data) => {
    if (err) throw err;
    const { users, idGen } = JSON.parse(data);
    const newUsers = [...users, { id: idGen, ...req.body }];
    const newData = JSON.stringify({
      users: newUsers,
      idGen: idGen + 1,
    });

    fs.writeFile(fileName, newData, () => {
      res.status(201);
      res.send(req.body);
    });
  });
});

app.put("/users", (req, res) => {
  fs.readFile(fileName, encoding, (err, data) => {
    if (err) throw err;
    const { users, idGen } = JSON.parse(data);

    const newData = JSON.stringify({
      users: users.map((u) =>
        req.body.id === u.id ? { ...req.body } : { ...u }
      ),
      idGen,
    });

    fs.writeFile(fileName, newData, () => {
      res.status(204);
      res.send();
    });
  });
});

app.delete("/users", (req, res) => {
  fs.readFile(fileName, encoding, (err, data) => {
    if (err) throw err;
    const { users, idGen } = JSON.parse(data);

    const newData = JSON.stringify({
      users: users.filter((u) => req.body.id !== u.id),
      idGen,
    });

    fs.writeFile(fileName, newData, () => {
      res.status(204);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
