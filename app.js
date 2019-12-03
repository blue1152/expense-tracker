const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Record = require("./models/record");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// setting method-override
app.use(methodOverride("_method"));
// setting static files
app.use(express.static("public"));
// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// db setting
mongoose.connect("mongodb://localhost/record", {
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

// setting Passport
app.use(passport.initialize());
app.use(passport.session());
// 載入 Passport config
require("./config/passport")(passport);
// setting Connect flash
app.use(flash());
// 登入後可以取得使用者資訊, 在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated(); // 辨識使用者是否已經登入的變數，讓 view 可以使用
  // 新增 flash message 變數
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

// setting routes
app.use("/", require("./routes/home"));
app.use("/restaurants", require("./routes/record"));
app.use("/users", require("./routes/user"));

// listening
app.listen(3000, () => {
  console.log(`Express is listening on localhost`);
});
