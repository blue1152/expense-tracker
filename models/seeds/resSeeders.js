const mongoose = require("mongoose");
const Res = require("../res");
const User = require("../user");

const { users: userList } = require("../../user.json");
const { results: restaurantList } = require("../../restaurant.json");

mongoose.connect("mongodb://127.0.0.1/restaurants", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error!");
});

db.once("open", () => {
  console.log("db connected!");

  userList.forEach((user, index) => {
    // create users
    User.create({
      email: user.email,
      password: user.password
    }).then(users => {
      // #1 - #3 for user1; #4 - #6 for user2
      const restaurants = index
        ? restaurantList.slice(3, 6)
        : restaurantList.slice(0, 3);
      restaurants.forEach(restaurant => {
        Res.create({
          name: restaurant.name,
          name_en: restaurant.name_en,
          category: restaurant.category,
          image: restaurant.image,
          location: restaurant.location,
          phone: restaurant.phone,
          google_map: restaurant.google_map,
          rating: restaurant.rating,
          description: restaurant.description,
          userId: users._id
        });
      });
    });
  });
});
console.log("restaurant and user seeds are created");
