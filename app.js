const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Res = require("./models/res");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 設定 method-override
app.use(methodOverride("_method"));

// setting static files
app.use(express.static("public"));

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// db setting
mongoose.connect("mongodb://localhost/restaurants", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

// 設定 express-session
app.use(
  session({
    secret: "my key", // 私鑰
    resave: false,
    saveUninitialized: true
  })
);

// 使用 Passport
app.use(passport.initialize());
app.use(passport.session());

// 載入 Passport config
require("./config/passport")(passport);

// 使用 Connect flash
app.use(flash());

// 登入後可以取得使用者資訊, 在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated(); // 辨識使用者是否已經登入的變數，讓 view 可以使用
  // 新增兩個 flash message 變數
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

// 載入路由器
app.use("/", require("./routes/home"));
app.use("/restaurants", require("./routes/restaurant"));
app.use("/users", require("./routes/user"));

// listening
app.listen(3000, () => {
  console.log(`Express is listening on localhost`);
});
