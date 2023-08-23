const express = require("express");
const router = express.Router();
const {
  Users,
  Experts,
  UserStatus,
  KycRequests,
  SendKycLink
} = require("../Controller/Admin");

router.get("/users", Users);
router.get("/experts", Experts);
router.get("/kyc-requests", KycRequests);
router.post("/status", UserStatus);
router.get("/kyc-link/:email",SendKycLink)

module.exports = router;
