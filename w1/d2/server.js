const http = require("http");
const fs = require("fs");

// const users = [
//   { name: "Arthur", country: "Brazil" },
//   { name: "Nicolas", country: "Ecuador" },
//   { name: "Megumi", country: "Japan" },
// ];
const server = http.createServer((request, response) => {
  console.log("url", request.url);
  if (request.url === "readFile") {
    fs.readFile("index.html", "utf8", (error, data) => {
      if (error) {
        console.log("error on read file", error);
      } else {
        console.log("content file", data);
        response.writeHead(200, { "content-type": "text/html" });
        response.write(data);
        response.end();
      }
    });
  }
  if (request.url === "/createFile") {
    fs.writeFile("index2.html", "<h1>File created and changed!</h1>", (err) => {
      if (err) {
        console.log("Error on create file", err);
      } else {
        response.writeHead(201, { "content-type": "application/json" });
        response.write(JSON.stringify({ message: "File created." }));
        response.end();
      }
    });
  }
  if (request.url === "/updateFile") {
    fs.appendFile("index2.html", "<h1>Content appended!</h1>", (err) => {
      if (err) {
        console.log("Error on update file", err);
      } else {
        response.writeHead(201, { "content-type": "application/json" });
        response.write(JSON.stringify({ message: "File updated." }));
        response.end();
      }
    });
  }
  if (request.url === "/deleteFile") {
    fs.unlink("index2.html", (err) => {
      if (err) {
        console.log("Error on delete file", err);
      } else {
        response.writeHead(200, { "content-type": "application/json" });
        response.write(JSON.stringify({ message: "File deleted." }));
        response.end();
      }
    });
  }
  if (request.url === "/renameFile") {
    fs.rename("index.html", "main.html", (err) => {
      if (err) {
        console.log("Error on rename file", err);
      } else {
        response.writeHead(200, { "content-type": "application/json" });
        response.write(JSON.stringify({ message: "File renamed." }));
        response.end();
      }
    });
  }
  if (request.url === "/users") {
    console.log("method", request.method);
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify({ users }));
    response.end();
  }
});

server.listen(3000, () => console.log("server runnning on 3000"));
