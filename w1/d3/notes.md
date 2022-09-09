# CRUD / BREAD with Express

## Agenda

- [ ] Express

- [ ] CRUD / BREAD

- [ ] Middleware

- [ ] Routes

- [ ] EJS Templates

## Express

Framework for Node.js apps to more easily create a server and handle requests and responses.

```
npm install express
```

```js
// import express
const express = require("express");

// create an express app
const app = express();

// initialize the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## CRUD / BREAD

- **C**reate - POST
- **R**ead - GET
- **U**pdate - PUT
- **D**elete - DELETE

---

- **B**rowse - GET (list)
- **R**ead - GET (detail)
- **E**dit - PUT (update)
- **A**dd - POST (create)
- **D**elete - DELETE (delete)

## GET / POST

### GET

- Is able to send a request with query params (key/value pairs in the URL)
- Easy to share / reproduce

### POST

- Not easily bookmarkable / reproducible.
- Does not show submission data in the URL / address bar.

## Middleware

- Middleware is a function that runs before the request reaches the route handler
- It can be used to validate the request, or to do some other processing
- It can be used to modify the request object, or to send a response back to the client
- It can be used to call the next middleware in the stack

```js
// import middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

// middleware function
const logger = (req, res, next) => {
  console.log("Logging...");
  next();
};

// use middleware
app.use(logger);
app.use(morgan("dev"));
app.use(bodyParser.json());

// use middleware for a specific route

// GET /users
app.get("/users", logger, (req, res) => {
  res.send("Users");
});

// POST /users
app.post("/users", logger, (req, res) => {
  console.log(req.body);
  res.send("Add User");
});
```

## Routes

- Routes are used to handle requests to a specific endpoint
- Routes can be used to handle different HTTP methods / paths / parameters

```js
// GET /users
app.get("/users", (req, res) => {
  res.send("Users");
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  res.send("User detail");
});

// POST /users
app.post("/users", (req, res) => {
  res.send("Add user");
});

// PUT /users/:id
app.put("/users/:id", (req, res) => {
  res.send("Update user");
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  res.send("Delete user");
});
```

## EJS Templates

Used for making modularized HTML within a Node.js backend.

- Separation of concerns
- Write HTML without formatting as a string
- Sprinkle in some JavaScript logic / expressions if/where you need to

```
npm install ejs
```

```js
// set the view engine to ejs
app.set("view engine", "ejs");
```

```js
// render `home.ejs`
app.get("/", (req, res) => {
  res.render("home");
});
```

```html
<!-- views/home.ejs -->
<h1>Home</h1>
```

## Exercise

> Instructions are in the `exercise.js` file.

## Resources

- [Express](https://expressjs.com/)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [EJS](https://ejs.co/)
- [Morgan](https://expressjs.com/en/resources/middleware/morgan.html)
- [Body Parser](https://www.npmjs.com/package/body-parser)
