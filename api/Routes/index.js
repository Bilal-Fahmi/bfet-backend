const express = require("express");
const router = express.Router();

const { login, signup, verifyLink, forgotpass } = require("../Controller/Auth");
const {
  profile,
  filemanage,
  updateDescripiton,
  mindexp,
  createBlog,
  viewBlog,
  singleblog,
} = require("../Controller/User");
const upload = require("../Middleware/multer");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpass", forgotpass);
router.post("/upload/:_id", upload.single("document"), filemanage);
router.post("/update-descripiton", updateDescripiton);
router.post("/createBlog/:_id", upload.single("files"), createBlog);

router.get("/profile/:_id", profile);
router.get("/mindexp", mindexp);
router.get("/view-blogs", viewBlog)
router.get("/blog/:_id",singleblog)

router.patch("/verify-link", verifyLink);

module.exports = router;
