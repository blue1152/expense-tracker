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
