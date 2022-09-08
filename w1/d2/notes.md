# File system module in Node.js

## What is a module?

It is a collection of functionalities that can be imported in a project.

## How to use it?

### Import

```js
// import file system module
const fs = require("fs");
```

> You can either create, read, update, delete, rename any file in your computer

[File System module Documentation](https://nodejs.org/api/fs.html)

### Read file

```js
const fs = require("fs");

// function to read a file
fs.readFile("index.html", (err, data) => {
  if (err) {
    console.log("error on read file", err);
  }
  console.log("content of file", data);
});
```

### Create file

```js
// function to create a file
fs.writeFile("index.html", "<h1>Hello</h1>", (err) => {
  if (err) {
    console.log("error on write file", err);
  }
  console.log("File created");
});
```

> In case of the file exists, the `writeFile` function will overwrite the existing file with the new content

### Update file

```js
fs.appendFile("index.html", "<h1>Hello</h1>", (err) => {
  if (err) {
    console.log("error on append file", err);
  }
  console.log("File created/updated");
});
```

> If file doesn't exists, it will behave as the same as `writeFile` function.

### Delete file

```js
fs.unlink("index.html", (err) => {
  if (err) {
    console.log("error on delete file", err);
  } else {
    console.log("File deleted!");
  }
});
```

### Rename file

```js
fs.unlink("index.html", "main.html", (err) => {
  if (err) {
    console.log("error on rename file", err);
  } else {
    console.log("File renamed!");
  }
});
```

## Exercise

REST Client Extension: humao.rest-client

[Get body data from POST request](https://nodejs.dev/en/learn/get-http-request-body-data-using-nodejs/)

- Create a node http server (app.js)
- readFile (users.json)
- update file, if add new user, update user or delete new user, override users.json file with new content

Get -> get all users
Post -> add new user
Put -> update user by id
Delete -> delete user by id

- Based on requests, filter users data and send it back to client
