const User = require("../Model/UserModel");

exports.UpdateUser = async (uuid, iSBlock) => {
  try {
    if (typeof iSBlock != "boolean") throw new Error();
    const user = await User.findOneAndUpdate(
      { uuid: uuid },
      { $set: { iSBlock: iSBlock } },
      { new: true }
    );
    if (!user) {
      throw new Error(`User with UUID ${uuid} not found`);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.ViewUser = () => {
  try {
    const users = User.find({ role: "user" });
    return users;
  } catch (error) {
    console.log(error);
  }
};

// -------------------------------------- Experts ----------------------------------------------------

exports.ViewExpert = () => {
  try {
    const experts = User.find({ role: "expert" });
    return experts;
  } catch (error) {
    console.log(error);
  }
};

exports.ViewKycRequests = () => {
  try {
    const user = User.find({
      role: "user",
      filename: { $ne: " " },
    });
    return user
  } catch (error) {
    console.log(error);
  }
};


