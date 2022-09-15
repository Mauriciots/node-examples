//const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 13;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: [
      '747322d6-a011-4020-9fc1-a7c3f6a61e84',
    ],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.set("view engine", "ejs");

const users = {};

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const receivedUsername = req.body.username;
  users[receivedUsername] = {
    ...req.body,
    password: await hashPassword(req.body.password),
  };
  req.session.username = receivedUsername;
  //res.cookie("username", receivedUsername);
  // res.end(req.session.username);
  res.redirect("/profile");
});

app.get("/profile", (req, res) => {
  const username = req.session.username;
  if (!username) return res.redirect("/login");
  const user = users[username];
  res.render("profile", { user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const receivedUsername = req.body.username;
  const receivedPassword = req.body.password;
  const user = users[receivedUsername];
  if (!user) return res.send("invalid username");

  const isMatch = await bcrypt.compare(receivedPassword, user.password);

  if (isMatch) {
    req.session.username = user.username;
    return res.redirect("/profile");
  }
  res.send("invalid password");
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

app.listen(8080, () => console.log("server running 8080"));
