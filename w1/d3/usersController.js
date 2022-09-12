const fs = require("fs");

const fileName = "users.json";
const encoding = "utf8";

async function getAll() {
  const { users } = await asyncReadFile();
  return users;
}

async function create(userData) {
  const { users, idGen } = await asyncReadFile();
  const user = { ...userData, id: idGen };
  const newUsers = [...users, user];
  return asyncWriteFile(
    JSON.stringify({
      users: newUsers,
      idGen: idGen + 1,
    })
  );
}

async function update(userData) {
  const { users, idGen } = await asyncReadFile();
  const newUsers = users.map((u) =>
    userData.id === u.id ? { ...userData } : { ...u }
  );
  return asyncWriteFile(
    JSON.stringify({
      users: newUsers,
      idGen: idGen + 1,
    })
  );
}

async function remove(userId) {
  const { users, idGen } = await asyncReadFile();
  const newUsers = users.filter((u) => userId !== u.id);
  return asyncWriteFile(
    JSON.stringify({
      users: newUsers,
      idGen: idGen + 1,
    })
  );
}

async function asyncReadFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, encoding, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

async function asyncWriteFile(content) {
  return new Promise((resolve) => {
    fs.writeFile(fileName, content, () => {
      resolve();
    });
  });
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
