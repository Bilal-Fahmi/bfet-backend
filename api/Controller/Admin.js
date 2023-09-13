const User = require("../Model/UserModel");
const {
  sendVideoCallVerificationlink,
} = require("../Utils/sendVerificationEmail");
const {
  UpdateUser,
  ViewUser,
  ViewExpert,
  ViewKycRequests,
  UpdateRole,
} = require("../services/admin");

// To updated user status
exports.UserStatus = async (req, res) => {
  try {
    const { iSBlock, uuid } = req.body;
    const user = await UpdateUser(uuid, iSBlock);
    if (!user) throw new Error("Can't update user status");
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};

// To display users
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

// To display experts
exports.Experts = async (req, res) => {
  try {
    const experts = await ViewExpert();
    if (!experts || experts.length == 0) throw new Error("Experts not found");
    res.json({ experts });
  } catch (error) {
    console.log(error);
  }
};

// To display verification requests
exports.VerificationRequests = async (req, res) => {
  try {
    const user = await ViewKycRequests();
    if (!user || user.length == 0) throw new Error("No kyc requests found");
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

// To sent verification call link to user email
exports.SendVerificatonLink = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(req.body.email);
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found");
    sendVideoCallVerificationlink(user);
    res.json({ success: "Verification link sent" });
  } catch (error) {
    console.log(error);
  }
};

// To change the role of user to expert after verification
exports.ChangeRole = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UpdateRole(email);
    if (!user) throw new Error("Role not updated");
    res.json({ success: "Role updated" });
  } catch (error) {
    console.log(error);
  }
};
