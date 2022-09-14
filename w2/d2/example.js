const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
app.use(cookieParser());

app.get("/login", (req, res) => {
  res.cookie("username", "bob");
  res.send("You are logged in");
});

app.get("/", (req, res) => {
  console.log("cookies", req.cookies);
  if (req.cookies.username) {
    res.send("You are logged in");
    return;
  }
  res.send("You are logged out");
  // console.log("headers", req.headers.cookie);
  // const cookie = req.headers.cookie;
  // const cookieArr = cookie.split("=");
  // const cookieParse = {};
  // cookieParse[cookieArr[0]] = cookieArr[1];
  // console.log("parse", cookieParse);
});

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

app.listen(3002, () => console.log("server 3002"));
