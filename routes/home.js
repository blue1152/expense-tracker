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
  Record.aggregate(
    [
      {
        $match: {
          $and: [{ userId: req.user._id }, { category: "家居物業" }]
        }
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ],
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records });
    }
  ).then(res => console.log(res));
});
router.get("/category/traffic", authenticated, (req, res) => {
  Record.aggregate(
    [
      {
        $match: {
          $and: [{ userId: req.user._id }, { category: "交通出行" }]
        }
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ],
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records });
    }
  ).then(res => console.log(res));
});
router.get("/category/relax", authenticated, (req, res) => {
  Record.aggregate(
    [
      {
        $match: {
          $and: [{ userId: req.user._id }, { category: "休閒娛樂" }]
        }
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ],
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records });
    }
  ).then(res => console.log(res));
});
router.get("/category/food", authenticated, (req, res) => {
  Record.aggregate(
    [
      {
        $match: {
          $and: [{ userId: req.user._id }, { category: "餐飲食品" }]
        }
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ],
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records });
    }
  ).then(res => console.log(res));
});
router.get("/category/others", authenticated, (req, res) => {
  Record.aggregate(
    [
      {
        $match: {
          $and: [{ userId: req.user._id }, { category: "其他" }]
        }
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ],
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records });
    }
  ).then(res => console.log(res));
});

//搜尋框
router.get("/search", authenticated, (req, res) => {
  const keyword = req.query.keyword;
  const keywordRegex = new RegExp(keyword, "i"); //正規表達式
  Record.find(
    {
      $and: [{ userId: req.user._id }],
      $or: [
        { name: { $regex: keywordRegex, $options: "$i" } },
        { category: { $regex: keywordRegex } }
      ]
    },
    (err, records) => {
      if (err) return console.error(err);
      return res.render("index", { records, keyword });
    }
  );
});

// 設定路由模組
module.exports = router;
