const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  BlockedUserError,
  InvaildCredentialsError,
  HashedPasswordError,
  UserAlreadyExistError,
} = require("../Error/Error");

async function generateHashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  if (!hash) return false;
  return hash;
}

const verifyPassword = async (password, hashpassword) => {
  const result = await bcrypt.compare(password, hashpassword);
  if (!result) throw new InvaildCredentialsError("Invaild Credentials");
  return result;
};

// User signup
exports.UserSignup = async (userData, uuid) => {
  const userExist = await User.findOne({ email: userData.email });
  if (userExist) throw new UserAlreadyExistError("User already exist");
  const hashpassword = await generateHashPassword(userData.password);
  if (!hashpassword) throw new HashedPasswordError("User data not saved");
  const newUser = new User({
    ...userData,
    password: hashpassword,
    uuid,
    emailToken: crypto.randomBytes(64).toString("hex"),
  });
  newUser.save();
  return newUser;
};

// User login
exports.UserLogin = async (userData, password) => {
  const userExist = await User.findOne({ email: userData.email });
  console.log(userExist);
  if (!userExist) throw new Error("Invaild credentials");
  if (userExist.status === "Blocked")
    throw new BlockedUserError("Blocked User");
  if (userExist && (await verifyPassword(password, userExist.password)))
    return userExist;
};

// To verify email after user clicking verify email that sent to their email
exports.VerifyEmail = async (emailToken) => {
  try {
    
    const updatedUser = await User.findOneAndUpdate(
    
      { emailToken: emailToken },
      { $set: { isVerified: true, emailToken: null } },
      { new: true }
    );
      console.log(updatedUser);
    if (!updatedUser) {
      throw new Error(`User with UUID ${uuid} not found`);
    }
    return true
  } catch (error) {
    console.error(`Error updating user verfication for UUID ${uuid} `, error);
    throw error;
  }
};
