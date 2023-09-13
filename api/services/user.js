const Blog = require("../Model/BlogSchema");
const User = require("../Model/UserModel");

// User profile
exports.userProfile = (_id) => {
  const user = User.findOne({ _id: _id });
  if (!user) throw new error(`User with _id ${_id} not found`);
  return user;
};

// To save docs and selected option (mind or body)
exports.saveFileNameExpert = async (_id, filename, selectedOption) => {
  const user = await User.findOne({ _id: _id });
  if (user.filename) throw new Error("User verification under process");
  console.log(user.filename);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: _id },
    { $set: { filename: filename, selectedOption: selectedOption } },
    { new: true }
  );

  if (!updatedUser) throw new Error(`User with _id ${_id}} not found `);
  return updatedUser;
};

// To upload expert description
exports.updateDescp = async (_id, descripiton) => {
  const user = await User.findOne({ _id: _id });
  const updatedUser = await User.findOneAndUpdate(
    { _id: _id },
    { $set: { descripiton: descripiton } },
    { upsert: true, new: true }
  );
  return updatedUser;
};

// To fetch experts on fit mind from db
exports.mindexp = async () => {
  const expert = await User.find({
    selectedOption: "Mind",
  });
  if (!expert) throw new Error("Experts not found");
  return expert;
};

// To fetch experts on fit body from db
exports.bodyexp = async () => {
  const expert = await User.find({
    selectedOption: "Body",
  });
  if (!expert) throw new Error("Experts not found");
  return expert;
};

// To add blogs to the db taking in expert id, title, summmary, content and img path of the blog
exports.createBlog = async (_id, title, summary, content, filename) => {
  const newBlog = new Blog({
    title: title,
    summary: summary,
    content: content,
    coverImg: filename,
    author: _id,
  });
  newBlog.save();
  return newBlog;
};

// To fetch the blogs posted by the experts from the db
exports.viewBlogs = async () => {
  const blogs = await Blog.find();
  if (!blogs) throw new Error("Blogs not available");
  return blogs;
};

// To fetch single blog post for the db
exports.singleBlog = async (_id) => {
  // console.log(_id,'herehrer');
  const singleBlog = await Blog.findById({ _id: _id })
  if (!singleBlog) throw new Error(`Blog with this ${_id} not found`)
  return singleBlog
}