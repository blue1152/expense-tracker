const mongoose = require("mongoose");
const Record = require("../record");
const bcrypt = require("bcryptjs");
const User = require("../user");

const { users: userList } = require("../../user.json");
const { results: dataList } = require("../../record.json");

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/record", {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error!");
});

db.once("open", () => {
  console.log("db connected!");

  userList.forEach((user, index) => {
    // create users
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        User.create({
          name: user.name,
          email: user.email,
          password: hash
        }).then(users => {
          // #1 - #3 for user1; #4 - #5 for user2
          const data = index ? dataList.slice(3, 5) : dataList.slice(0, 3);
          data.forEach(data => {
            Record.create({
              name: data.name,
              category: data.category,
              amount: data.amount,
              userId: users._id
            });
          });
        });
      });
    });
  });
  console.log("restaurant and user seeds are created");
});
