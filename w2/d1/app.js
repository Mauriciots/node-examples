const express = require("express");

let idSeed = 2;
const pets = [{ id: 1, name: "Zoey", age: 1, type: "dog" }];

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/new", (_req, res) => {
  res.render("pet-form", { pet: { name: '', age: null, type: '' }, formAction: '/new' });
});

app.get("/", (req, res) => {
  res.render("pet-list", { pets });
});

app.get("/edit/:id", (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) {
    res.status(404);
    res.send();
  } else {
    res.render("pet-form", { pet, formAction: `/edit/${pet.id}` });
  }
});

app.post("/delete/:id", (req, res) => {
  const petIndex = pets.findIndex(p => p.id === parseInt(req.params.id));
  console.log('Delete', petIndex)
  if (petIndex >= 0) {
    pets.splice(petIndex, 1);
  }
  res.redirect("/");
});

app.post("/new", (req, res) => {
  console.log("body", req.body);
  pets.push({ ...req.body, id: idSeed });
  idSeed += 1;
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) {
    res.status(404);
    res.send();
  } else {
    pet.name = req.body.name;
    pet.age = req.body.age;
    pet.type = req.body.type;
    res.redirect("/")
  }
});

app.listen(3003, () => {
  console.log("Server listening on port 3003");
});
