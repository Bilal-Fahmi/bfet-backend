const User = require("../Model/UserModel");

exports.UpdateUser = (uuid, isblock) => {
  try {
    if (typeof isblock != "boolean") throw new Error();
    const user = User.findOneAndUpdate(
      { uuid: uuid },
      { $set: { isblock: isblock } },
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
