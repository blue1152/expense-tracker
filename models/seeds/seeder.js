const mongoose = require("mongoose");
const Record = require("../record");
const User = require("../user");

const { users: userList } = require("../../user.json");
const { results: dataList } = require("../../record.json");

mongoose.connect("mongodb://127.0.0.1/record", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error!");
});

db.once("open", () => {
  console.log("db connected!");

  userList.forEach((user, index) => {
    // create users
    User.create({
      name: user.name,
      email: user.email,
      password: user.password
    }).then(users => {
      // #1 - #3 for user1; #4 - #5 for user2
      const records = index ? dataList.slice(3, 5) : dataList.slice(0, 3);
      records.forEach(record => {
        Record.create({
          name: record.name,
          category: record.category,
          amount: record.amount,
          userId: users._id
        });
      });
    });
  });
});
console.log("record data and user seeds are created");
