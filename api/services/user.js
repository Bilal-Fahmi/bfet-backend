const User = require("../Model/UserModel");

exports.userProfile = (uuid) => {
  try {
    const user = User.find({ uuid: uuid });
    if (!user) throw new error(`User with UUID ${uuid} not found`);
    return user;
  } catch (error) {
    console.log(error);
  }
};
