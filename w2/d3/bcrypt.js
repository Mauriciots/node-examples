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
  console.time("hashing");
  const salt = await bcrypt.genSalt(saltRounds);
  console.log("salt", salt);
  const hash = await bcrypt.hash(password, salt);
  console.log("hash", hash);
  console.timeEnd("hashing");
  //   const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

hashPassword(user.password, saltRounds);

// users.push({ ...user, password: hashedPassword });

// Compare the password and return true or false
// const isMatch = bcrypt.compare(user.password, hashedPassword);
