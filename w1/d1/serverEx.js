const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { url } = req;

  console.log("Request received", req.url);

  switch (url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.write(
        '<ul><li><a href="/cats">Cats</a></li><li><a href="/dogs">Dogs</a></li></ul>'
      );
      break;
    case "/cats":
      res.setHeader("Content-Type", "text/html");
      res.write(
        '<img src="https://people.com/thmb/3Uykg2BgCTzJWpxL8Q_XuzLCWBM=/400x0/filters:no_upscale():max_bytes(150000):strip_icc():gifv():focal(602x0:604x2)/xherdan-cat-2-1a0a928c0605461f851e49fb5b5f29af.jpg" alt="Terrifying cat" />'
      );
      break;
    case "/dogs":
      res.setHeader("Content-Type", "text/html");
      res.write(
        '<img src="https://i.pinimg.com/originals/9c/e5/10/9ce510e425193f2ed6089354214e9657.jpg" alt="Cute dog" />'
      );
      break;
    case "/users":
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify([
          { id: 1, username: "Mauricio" },
          { id: 2, username: "Megumi" },
          { id: 3, username: "Gabriel" },
          { id: 4, username: "Yuto" },
        ])
      );
      break;
    case "/products":
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify([
          { id: 1, username: "Bottle" },
          { id: 2, username: "Cellphone" },
          { id: 3, username: "Earbuds" },
          { id: 4, username: "Watch" },
        ])
      );
      break;
    default:
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>Nothing to show here</h1>");
      break;
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
