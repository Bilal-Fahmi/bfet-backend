const { UserLogin, UserSignup, VerifyEmail } = require("../services/auth");
const { SignupSchema, LoginSchema } = require("../Validation/joiSchema");
const { generateUUID } = require("../Utils/helper");
const { verifyToken, generateToken } = require("../Utils/jwt");
const { sendVerificationMail } = require("../Utils/sendVerificationEmail");
const { UserAlreadyExistError } = require("../Error/Error");

//Signup
exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { error, value } = SignupSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    const uuid = generateUUID();
    const user = await UserSignup(value, uuid);
    if (!user) {
      throw new Error("User registration failed or returned an empty result");
    }
    sendVerificationMail(user);
    res.json({ success: "Account created" });
  } catch (error) {
    res.json({ error: error.message });
    console.log(error.message);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { error, value } = LoginSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    let user = await UserLogin(value, value.password);
    console.log(user);
    if (!user) {
      throw new Error("User login failed");
    }
    let token = await generateToken({ _id: user._id, role: user.role });
    res.json({ success: "Signned  in", token, user });
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
};

// To sent verifylink to the user email
exports.verifyLink = async (req, res) => {
  const { emailToken } = req.body;
  try {
    const result = await VerifyEmail(emailToken);
    if (!result) throw new Error("can't verify email");
    res.json({ success: { status: true } });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Forgot password
exports.forgotpass = async (req, res) => {
  const { emailToken } = req.body;
  try {
    const result = await VerifyEmail(emailToken);
    if (!result) throw new Error("can't verify email");
    res.json({ success: { status: true } });
  } catch (error) {
    res.json({ error: error.message });
  }
};
