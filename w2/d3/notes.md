# Real World HTTP Servers

## Content

- Security
- Middlewares

## Security

### Security Issue #1: Passwords

- Password that are stored in plain text is a security breach
- Check [Plain text offenders](https://plaintextoffenders.com/)
- What is the solution? **Hashing**

### Hashing

- The original string is passed into a function that performs some kind of transformation on it and returns a different string (the hash)
- Hashing is a one way process: a hashed value cannot be retrieved
- Each iteration is doubling the time it takes to hash the content
- We make hashing more secure by adding a salt to the original string prior to hashing
- This helps to protect against [Rainbow Table attacks](https://www.beyondidentity.com/glossary/rainbow-table-attack)
- We simply need to increase the iteration count if computers become more powerful

> Do not use MD5 or SHA1 for hashing passwords

### Bcrypt

- Bcrypt is a hashing algorithm that is designed to be slow

```js
// import bcrypt
const bcrypt = require("bcrypt");

const users = [];

const user = {
  username: "admin",
  password: "password",
};

// 10 is the minimum, 12 is recommended => 2^12 = 4096
const saltRounds = 12;

// Hashing the password
const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  //   const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const hashedPassword = hashPassword(user.password, saltRounds);

users.push({ ...user, password: hashedPassword });

// Compare the password and return true or false
const isMatch = bcrypt.compare(user.password, hashedPassword);
```

### Security Issue #2: Cookies

- Cookies information is stored in plain-text
- Plain text cookies can be modified
- We might impersonate another user
- What is the solution? **Encryption**

### Encription

Information is encrypted using a key
It can be decrypted by the recipient using the key

### Cookie-Session

- Cookie-session is a middleware that encrypts the cookie
- It is a wrapper around the cookie-parser middleware

```js
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

app.get("/", function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1;

  // Write response
  res.end(req.session.views + " views");
});

app.listen(3000);
```

### Encryption vs Hashing

- Encryption is reversible
- Hashing is not reversible
- Encryption is used to encrypt data
- Hashing is used to verify data

### Stealing Cookies

- HTTP is plain-text
- Man-in-the-middle attack
- What is the solution? **HTTPS**
