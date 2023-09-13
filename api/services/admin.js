const User = require("../Model/UserModel");

// To update user status
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

// To display user
exports.ViewUser = () => {
  const users = User.find({ role: "user" });
  return users;
};

// -------------------------------------- Experts ----------------------------------------------------

// To display expert
exports.ViewExpert = () => {
  const experts = User.find({ role: "expert" });
  return experts;
};

// To display verification requests
exports.ViewKycRequests = () => {
  const user = User.find({
    role: "user",
    filename: { $ne: " " },
  });
  return user;
};

// To update user role to expert after verification
exports.UpdateRole = (email) => {
  const user = User.findOneAndUpdate(
    { email: email },
    { $set: { role: "expert" } },
    { new: true }
  );
  return user;
};
