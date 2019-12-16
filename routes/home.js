const express = require("express");
const router = express.Router();
const Record = require("../models/record");
// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require("../config/auth");

// setting routes
router.get("/", authenticated, (req, res) => {
  Record.find({ userId: req.user._id }, (err, records) => {
    if (err) return console.error(err);
    return res.render("index", { records: records }); // 將資料傳給 index
  });
});
// 篩選框
router.get("/category/home", authenticated, (req, res) => {
  Record.find(
    {
      $and: [{ userId: req.user._id }, { category: "家居物業" }]
    },
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records: records }); // 將資料傳給 index
    }
  );
});

router.get("/category/traffic", authenticated, (req, res) => {
  Record.find(
    {
      $and: [{ userId: req.user._id }, { category: "交通出行" }]
    },
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records: records }); // 將資料傳給 index
    }
  );
});
router.get("/category/relax", authenticated, (req, res) => {
  Record.find(
    {
      $and: [{ userId: req.user._id }, { category: "休閒娛樂" }]
    },
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records: records }); // 將資料傳給 index
    }
  );
});
router.get("/category/food", authenticated, (req, res) => {
  Record.find(
    {
      $and: [{ userId: req.user._id }, { category: "餐飲食品" }]
    },
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records: records }); // 將資料傳給 index
    }
  );
});
router.get("/category/others", authenticated, (req, res) => {
  Record.find(
    {
      $and: [{ userId: req.user._id }, { category: "其他" }]
    },
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records: records }); // 將資料傳給 index
    }
  );
});

// 設定路由模組
module.exports = router;
