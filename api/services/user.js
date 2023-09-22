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
  const singleBlog = await Blog.findById({ _id: _id });
  if (!singleBlog) throw new Error(`Blog with this ${_id} not found`);
  return singleBlog;
};

// To update the slots that is given by the expert in db
exports.updateSlot = async (_id, slots) => {
  const slotArray = slots.slots;
  const expertSlot = await User.findByIdAndUpdate(
    { _id: _id },
    { $set: { slots: slotArray } },
    { new: true }
  );
  return expertSlot;
};

// To fetch single expert data from the db for expert booking page
exports.singleExpert = async (_id) => {
  const expert = await User.findById({ _id: _id });
  return expert;
};

// To fetch single expert blogs form db
exports.singleExpBlog = async (_id) => {
  const expBlog = await Blog.findOne({
    author: _id,
  });
  return expBlog;
};

// To fetch author name from db
exports.expertName = async (_id) => {
  const expert = await User.findById({ _id: _id });
  return expert;
};

// To update user subscription
exports.userSubscribe = async (_id, session_id) => {
  const user = await User.findByIdAndUpdate(
    { _id: _id },
    { $set: { checkoutSessionId: session_id } },
    { new: true }
  );
  return user;
};

// To fetch stripe checkout session id from db
exports.sessionId = async (_id) => {
  const user = await User.findById(_id).select("checkoutSessionId");
  return user;
};

// Finding user by ID
exports.findingUserById = async (_id) => {
  const user = await User.findById({ _id: _id });
  return user;
};

// To update user subscription status
exports.updateSubscription = async (_id, updatedUser) => {
  const user = await User.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        checkoutSessionId: null,
        planId: updatedUser.planId,
        planType: updatedUser.planType,
        planDuration: updatedUser.planDuration,
        planStartDate: updatedUser.startDate,
        planEndDate: updatedUser.endDate,
      },
    },
    { new: true }
  );
  return user;
};

exports.userProfilepic = (_id, filename) => {
  const user = User.findByIdAndUpdate(
    { _id: _id },
    { $set: { profile: filename } },
    { new: true }
  );
  return user
};
