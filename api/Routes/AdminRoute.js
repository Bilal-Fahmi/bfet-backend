const express = require("express");
const router = express.Router();
const {
  Users,
  Experts,
  UserStatus,
  VerificationRequests,
  SendVerificatonLink,
  ChangeRole,
  expBlogs
} = require("../Controller/Admin");

router.get("/users", Users);
router.get("/experts", Experts);
router.get("/verification-requests", VerificationRequests);
router.get("/blogs",expBlogs)

router.post("/status", UserStatus);
router.post("/verification-link", SendVerificatonLink)
router.post("/update-role",ChangeRole)

module.exports = router;
