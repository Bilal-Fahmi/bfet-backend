const express = require("express");
const router = express.Router();
const {
  Users,
  Experts,
  UserStatus,
  VerificationRequests,
  SendVerificatonLink,
  ChangeRole,
  expBlogs,
  blogStatusBlock,
  blogStatusUnblock,
  AdminLogin,
} = require("../Controller/Admin");

router.get("/users", Users);
router.get("/experts", Experts);
router.get("/verification-requests", VerificationRequests);
router.get("/blogs", expBlogs)

router.post("/admin-login",AdminLogin)
router.post("/status", UserStatus);
router.post("/verification-link", SendVerificatonLink)
router.post("/update-role", ChangeRole)
router.post("/blog-block/:_id", blogStatusBlock)
router.post("/blog-unblock/:_id",blogStatusUnblock)

module.exports = router;
