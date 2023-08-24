const User = require("../Model/UserModel");

exports.userProfile = (_id) => {
  const user = User.findOne({ _id: _id });
  if (!user) throw new error(`User with _id ${_id} not found`);
  return user;
};

exports.saveFileNameExpert = async (_id, filename) => {
  const user = await User.findOne({ _id: _id });
  if (user.filename) throw new Error("User verification under process");
  console.log(user.filename);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: _id },
    { $set: { filename: filename } },
    { new: true }
  );

  if (!updatedUser) throw new Error(`User with _id ${_id}} not found `);
  return updatedUser;
};
