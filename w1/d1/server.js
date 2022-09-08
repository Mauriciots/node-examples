const http = require("http");

const data = { message: "Hello World!" };

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Jim", age: 28 },
];

const products = [
  { name: "Apple", price: 1.5 },
  { name: "Orange", price: 2.5 },
  { name: "Banana", price: 3.5 },
];

const server = http.createServer((req, res) => {
  console.log("request received", req.url);
  if (req.url === "/dogs") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<img src='https://i.pinimg.com/originals/b9/7d/97/b97d976b20e9889918becf0f5f4e7cbd.jpg'>"
    );
  }
  if (req.url === "/cats") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<img src='https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg'>"
    );
  }
  if (req.url === "/hello") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(data));
  }
  if (req.url === "/users") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
  }
  if (req.url === "/products") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(products));
  }

  res.end();
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
