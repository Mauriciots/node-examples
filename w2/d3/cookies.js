var cookieSession = require("cookie-session");
var express = require("express");

var app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [
      /* secret keys */
      "key1",
      "key2",
    ],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.get("/profile", (req, res) => {
  if (!req.session.username) return res.redirect("/");
  res.send("logged");
});

app.get("/login", (req, res) => {
  req.session.username = "test";
  res.send("logged");
});

app.get("/", function (req, res, next) {
  // Update views
  //   req.session.views = (req.session.views || 0) + 1;
  //   req.session.username = user.username;

  // Write response
  res.end(req.session.views + " views");
});
//eyJ1c2VybmFtZSI6InRlc3QifQ==
//STGluUkzSdKcRxBamDlFkMycSF0

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});
app.listen(3000);
