
let mongoose = require('mongoose');
let categorySchema = require('../schema/categorySchema');

// 将 categorySchema 这个模式发布为 Model
// category -> categorys
let categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
