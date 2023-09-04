const User = require("../Model/UserModel");

exports.UpdateUser = async (uuid, iSBlock) => {
  if (typeof iSBlock != "boolean") throw new Error();
  const user = await User.findOneAndUpdate(
    { uuid: uuid },
    { $set: { iSBlock: iSBlock } },
    { new: true }
  );
  if (!user) {
    throw new Error(`User with UUID ${uuid} not found`);
  }
};

exports.ViewUser = () => {
  const users = User.find({ role: "user" });
  return users;
};

// -------------------------------------- Experts ----------------------------------------------------

exports.ViewExpert = () => {
  const experts = User.find({ role: "expert" });
  return experts;
};

exports.ViewKycRequests = () => {
  const user = User.find({
    role: "user",
    filename: { $ne: " " },
  });
  return user;
};

exports.UpdateRole = (email) => {
  const user = User.findOneAndUpdate(
    { email: email },
    { $set: { role: "expert" } },
    { new: true }
  );
  return user;
};
