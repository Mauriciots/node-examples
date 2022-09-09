const http = require("http");
const fs = require("fs");

const contentType = { "content-type": "application/json" };

const readBody = async (req) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/users") {
    fs.readFile("users.json", "utf8", async (err, data) => {
      if (err) {
        throw err;
      }

      switch (req.method) {
        case "GET":
          res.writeHead(200, contentType);
          res.write(data);
          res.end();
          break;
        case "POST":
          const newUserData = await readBody(req);
          console.log(JSON.parse(newUserData));

          const newUser = JSON.parse(newUserData);

          const dataObj = JSON.parse(data);
          dataObj.users.push({
            id: `${newUser.name}-${newUser.country}`.toLowerCase(),
            ...newUser,
          });

          fs.writeFile("users.json", JSON.stringify(dataObj), (err) => {
            if (err) {
              throw err;
            }
            res.writeHead(201, contentType);
            res.write(JSON.stringify(newUser));
            res.end();
          });
          break;
        case "PUT":
          const editUserData = await readBody(req);
          const editUser = JSON.parse(editUserData);

          console.log("New user", editUser);

          const editDataObj = JSON.parse(data);
          const newEditDataObj = editDataObj.users.map((u) => {
            return u.id === editUser.id ? { ...editUser } : { ...u };
          });

          fs.writeFile(
            "users.json",
            JSON.stringify({ users: newEditDataObj }),
            (err) => {
              if (err) {
                throw err;
              }
              res.writeHead(204, contentType);
              res.end();
            }
          );
          break;
        case "DELETE":
          const deleteUserData = await readBody(req);
          const deleteUser = JSON.parse(deleteUserData);
          const deleteDataObj = JSON.parse(data);
          const newDeleteDataObj = deleteDataObj.users.filter(
            (u) => u.id !== deleteUser.id
          );

          fs.writeFile(
            "users.json",
            JSON.stringify({ users: newDeleteDataObj }),
            (err) => {
              if (err) {
                throw err;
              }
              res.writeHead(204, contentType);
              res.end();
            }
          );
          break;
        default:
          res.writeHead(405, contentType);
          res.end();
          break;
      }
    });
  } else {
    res.writeHead(404, contentType);
    res.end();
  }
});

server.listen(3000, () => console.log("server runnning on 3000"));
