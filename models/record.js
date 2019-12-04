const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name: {
    //支出名稱
    type: String, // 資料型別: 字串
    required: true // 必填欄位
  },
  category: {
    //支出類別
    type: String,
    required: true
  },
  date: {
    //建立時間
    type: Date,
    default: Date.now
  },
  amount: {
    //金額
    type: String,
    required: true
  },
  // userId，建立跟 User 的關聯
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
});

module.exports = mongoose.model("Record", recordSchema);
