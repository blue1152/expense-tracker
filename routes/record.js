const express = require("express");
const router = express.Router();
const Record = require("../models/record");
// 載入 auth middleware
const { authenticated } = require("../config/auth");

// 新增一筆的頁面
router.get("/new", authenticated, (req, res) => {
  res.render("new");
});
// 顯示一筆詳細內容
router.get("/:id", authenticated, (req, res) => {
  Record.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurants) => {
      if (err) return console.error(err);
      return res.render("detail", { restaurants: restaurants });
    }
  );
});
// 新增一筆
router.post("/", authenticated, (req, res) => {
  const restaurant = new Record({
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    userId: req.user._id
  });
  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect("/"); // 新增完成後，將使用者導回首頁
  });
});
// 修改頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Record.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurants) => {
      if (err) return console.error(err);
      return res.render("edit", { restaurants: restaurants });
    }
  );
});
// 修改
router.put("/:id/edit", authenticated, (req, res) => {
  Record.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurants) => {
      if (err) return console.error(err);
      restaurants.name = req.body.name;
      restaurants.category = req.body.category;
      restaurants.amount = req.body.amount;
      restaurants.save(err => {
        if (err) return console.error(err);
        return res.redirect(`/restaurants/${req.params.id}`);
      });
    }
  );
});
// 刪除
router.delete("/:id/delete", authenticated, (req, res) => {
  Record.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurants) => {
      if (err) return console.error(err);
      restaurants.remove(err => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});

// 設定路由模組
module.exports = router;
