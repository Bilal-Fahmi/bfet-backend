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
  expertSlots,
  expertBooking,
  singleExpBlog,
  expertName,
  stripePublicKey,
  paymentIntent,
  subscriptionCheckoutSession,
  sessionId,
  paymentSuccess,
  profilePic,
  bodyexp,
} = require("../Controller/User");
const upload = require("../Middleware/multer");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpass", forgotpass);
router.post("/upload/:_id", upload.single("document"), filemanage);
router.post("/update-descripiton", updateDescripiton);
router.post("/createBlog/:_id", upload.single("files"), createBlog);
router.post("/expert-slots/:_id", expertSlots)
router.post("/subscription-checkout-session/:_id",subscriptionCheckoutSession)
router.post("/payment-success", paymentSuccess)
router.post("/profilePic/:_id",upload.single("profilePic"), profilePic)

router.get("/profile/:_id", profile);
router.get("/mindexp", mindexp);
router.get("/bodyexp",bodyexp)
router.get("/view-blogs", viewBlog)
router.get("/blog/:_id", singleblog)
router.get("/expert-booking/:_id", expertBooking)
router.get("/expert-blog/:_id", singleExpBlog)
router.get("/expert-name/:_id", expertName)
router.get("/stripe-key", stripePublicKey)
router.get("/checkout-sessionId/:_id",sessionId)

router.patch("/verify-link", verifyLink);

module.exports = router;
