const { UpdateUser, ViewUser, ViewExpert } = require("../services/admin");

exports.UserStatus = async (req, res) => {
  try {
    const { isblock, uuid } = req.body;
    const user = await UpdateUser(uuid, isblock);
    if (!user) throw new Error("Can't update user status");
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

exports.Users = async (req, res) => {
  try {
    const users = await ViewUser();
    if (!users || users.length == 0) throw new Error("Users not found");
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
};

// -------------------------------------- Experts ----------------------------------------------------

exports.Experts = async (req, res) => {
  try {
    const experts = await ViewExpert();
    if (!experts || experts.length == 0) throw new Error("Experts not found");
    res.json({ experts });
  } catch (error) {
    console.log(error);
  }
};
