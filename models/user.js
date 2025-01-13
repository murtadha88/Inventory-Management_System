const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
    enum: ["technology","fashion","food","furniture"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  inventory : [inventorySchema],
});

module.exports = mongoose.model('User', userSchema);
