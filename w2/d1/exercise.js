/**
 * Create a server using express that has the following routes:
 * Consider the resources / paths / methods...
 *
 * CREATE:  GET     /new        Form for new pet. =====> OK
 * SAVE:    POST    /new        Create the new pet (handle submission.)  =====> OK
 * READ:    GET     /           Index of Pets (Displays All) =====> OK
 * EDIT:    GET     /edit/:id   Render populated form.
 * UPDATE:  POST    /edit/:id   Update pet resource (handle submission.)
 * DELETE:  POST    /delete/:id Remove pet resource.
 *
 * The forms should be rendered using ejs.
 *
 * STRETCH (BONUS): The server should have a JSON file that stores the pets.
 *
 */
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let pets = [{ id: 1, name: "Zoey", age: 1, type: "dog" }];

app.get("/", (req, res) => {
  res.render("pets", { pets });
});

app.get("/new", (req, res) => {
  res.render("newPet");
});

app.post("/new", (req, res) => {
  console.log("body", req.body);
  const newPet = { ...req.body, id: pets.length + 1 };
  pets.push(newPet);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  console.log("params", req.params);
  //   const id = Number(req.params.id);
  const id = +req.params.id;
  const pet = pets.find((pet) => pet.id === id);
  res.render("editPet", { pet });
});

app.post("/edit/:id", (req, res) => {
  const updatedPet = { ...req.body };
  const id = +req.params.id;
  pets = pets.map((pet) => {
    if (pet.id === id) {
      return { ...pet, ...updatedPet };
    }
    return pet;
  });
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = +req.params.id;
  pets = pets.filter((pet) => pet.id !== id);
  res.redirect("/");
});

app.listen(3001, () => console.log("server running 3001"));
