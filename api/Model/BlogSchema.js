const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImg: {
    type: String,
  },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isBlock: {
    type: Boolean,
    default:false
  }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
