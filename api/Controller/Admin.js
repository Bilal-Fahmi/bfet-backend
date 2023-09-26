const User = require("../Model/UserModel");
const { generateToken } = require("../Utils/jwt");
const {
  sendVideoCallVerificationlink,
} = require("../Utils/sendVerificationEmail");
const {
  UpdateUser,
  ViewUser,
  ViewExpert,
  ViewKycRequests,
  UpdateRole,
  expBlogs,
  BlogStatusBlock,
  BlogStatusUnblock,
} = require("../services/admin");

// Admin Login
exports.AdminLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    if (email === process.env.adminMail && password === process.env.adminPass) {
      let token = await generateToken({ role: "admin" });
      res.json({ success: "Signned in", token });
    }
  } catch (error) {
    res.json({ error: "Invalid Credentials" });
    console.log(error);
  }
};

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

// To display blogs posted by experts
exports.expBlogs = async (req, res) => {
  try {
    const blogs = await expBlogs();
    if (!blogs) throw new Error("Blogs not found");
    res.json({ blogs });
  } catch (error) {
    console.log(error);
  }
};

// To block the blogs
exports.blogStatusBlock = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const blogs = await BlogStatusBlock(_id);
    if (!blogs) throw new Error("Blog status not updated");
    res.json({ success: "Blog blocked successfully" });
  } catch (error) {
    console.log(error);
  }
};

// To unblock the blogs
exports.blogStatusUnblock = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const blogs = await BlogStatusUnblock(_id);
    if (!blogs) throw new Error("Blog status not updated");
    res.json({ success: "Blog unblocked successfully" });
  } catch (error) {
    console.log(error);
  }
};
