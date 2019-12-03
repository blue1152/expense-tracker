const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resSchema = new Schema({
  name: {
    type: String, // 資料型別: 字串
    required: true // 必填欄位
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: false
  },
  rating: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  // 加入 userId，建立跟 User 的關聯
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
});

module.exports = mongoose.model("Res", resSchema);
