const express = require("express");
const router = express.Router();

const { login, signup, verifyLink, forgotpass } = require("../Controller/Auth");
const { profile, filemanage } = require("../Controller/User");
const upload = require("../Middleware/multer");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpass", forgotpass);
router.post("/upload/:_id", upload.single("document"), filemanage);
router.get("/profile/:_id", profile);
router.patch("/verify-link", verifyLink);

module.exports = router;
