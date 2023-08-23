const User = require("../Model/UserModel");

exports.userProfile = (_id) => {
  try {
    const user = User.findOne({ _id: _id });
    if (!user) throw new error(`User with _id ${_id} not found`);
    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.saveFileNameExpert = async (_id, filename) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: _id },
      { $set: { filename: filename } },
      { new: true }
    );

    if (!updatedUser) throw new Error(`User with _id ${_id}} not found `);
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};
