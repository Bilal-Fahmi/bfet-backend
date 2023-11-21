const {
  userProfile,
  saveFileNameExpert,
  updateDescp,
  mindexp,
  bodyexp,
  createBlog,
  viewBlogs,
  singleBlog,
  createSlot,
  singleExpert,
  singleExpBlog,
  expertName,
  userSubscribe,
  sessionId,
  findingUserById,
  updateSubscription,
  userProfilepic,
  AllExperts,
  findSlots,
  BookedSlot,
  saveImgLink,
} = require("../services/user");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51NqZrESBo809HwkAeqxG8SUIYiJiPuYUXrzD8kXTNbkz7VoBAD2yHZbeHI9bmq3BTD7w1gF7rU3YxuwQln8YzrAv00w4RytBws"
);
const uploadimage = require("../Middleware/cloudinary");

// User profile
exports.profile = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await userProfile(_id);
    if (!user) throw new Error("User not found");
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

// To upload docs to become expert
exports.filemanage = async (req, res) => {
  const { _id } = req.params;
  const filename = req.file.filename;
  const selectedOption = req.body.selectedOption;
  try {
    const user = await saveFileNameExpert(_id, filename, selectedOption);
    if (!user) throw new Error("File not saved");
    res.json({ success: "Filed saved" });
  } catch (error) {
    res.json({ error: error.message });

    console.log(error);
  }
};

//Expert

// To update expert description
exports.updateDescripiton = async (req, res) => {
  try {
    const user = await updateDescp();
  } catch (error) {
    console.log(error);
  }
};

// To display experts on fit mind
exports.mindexp = async (req, res) => {
  try {
    const expert = await mindexp();
    if (!res) throw new Error("Experts not available");
    res.json({ expert });
  } catch (error) {
    console.log(error);
  }
};

// To display experts on fit body
exports.bodyexp = async (req, res) => {
  try {
    const expert = await bodyexp();
    if (!res) throw new Error("Experts not available");
    res.json({ expert });
  } catch (error) {
    console.log(error);
  }
};

exports.allexp = async (req, res) => {
  try {
    const expert = await AllExperts();
    if (!res) throw new Error("Experts not available");
    res.json({ expert });
  } catch (error) {
    console.log(error);
  }
};

// To create blog when needed by expert
exports.createBlog = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, summary, content } = req.body;
    const url = await uploadimage(req.body.image);
    const blog = await createBlog(_id, title, summary, content, url);
    res.json({ success: "Blog created" });
  } catch (error) {
    console.log(error);
  }
};

// To view the blogs created by the experts
exports.viewBlog = async (req, res) => {
  try {
    const blogs = await viewBlogs();
    if (!blogs) throw new Error("Blogs not available");
    res.json({ blogs });
  } catch (error) {
    console.log(error);
  }
};

// To view specific blog
exports.singleblog = async (req, res) => {
  try {
    const { _id } = req.params;
    const blog = await singleBlog(_id);
    if (!blog) throw new Error(`Blog with this ${_id} not found`);
    res.json({ blog });
  } catch (error) {
    console.log(error);
  }
};

// To create slots that is selected by the expert
exports.expertSlots = async (req, res) => {
  try {
    const { _id } = req.params;
    const slot = req.body;
    const Slots = await createSlot(_id, slot);
    if (!Slots) throw new Error("Expert slot not updated");
    res.json({ success: "Slots updated" });
  } catch (error) {
    console.log(error);
  }
};

// To show expert data on the booking page
exports.expertBooking = async (req, res) => {
  try {
    const { _id } = req.params;
    const expert = await singleExpert(_id);
    if (!expert) throw new Error(`Expert with id ${_id} not found`);
    res.json({ expert });
  } catch (error) {
    console.log(error);
  }
};

// To show single expert blog in booking page
exports.singleExpBlog = async (req, res) => {
  try {
    const { _id } = req.params;
    const expBlog = await singleExpBlog(_id);
    if (!expBlog) throw new Error("Expert blogs not found");
    res.json({ expBlog });
  } catch (error) {
    res.json({ error });
    console.log(error);
  }
};

// To show expert name in blog page
exports.expertName = async (req, res) => {
  try { 
    
    const { _id } = req.params;
    const expert = await expertName(_id);
    console.log(expert);
    if (!expert) throw new Error("Expert not found");
    res.json({ expert });
  } catch (error) {
    console.log(error);
  }
};

// To send stripe PUBLISHABLE key to frontend
exports.stripePublicKey = (req, res) => {
  try {
    res.json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.log(error);
  }
};

//
// const basic = process.env.PLAN_ID
const basic = "price_1NrHWoSBo809HwkAH8ftqxjA";
const stripeSession = async (plan) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    return session;
  } catch (error) {
    console.log(error);
  }
};
// To set checkout session Id to user
exports.subscriptionCheckoutSession = async (req, res) => {
  try {
    const user_id = req.params._id;
    const session = await stripeSession(basic);
    if (session) {
      const updateUser = await userSubscribe(user_id, session.id);
      return res.json({ session });
    } else {
      console.error("Stripe session is undefined");
      return res.json("Stripe session is undefined");
    }
  } catch (error) {
    console.log(error);
  }
};

// To fetch stripe checkout session from db
exports.sessionId = async (req, res) => {
  try {
    const { _id } = req.params;
    const session_id = await sessionId(_id);
    if (!session_id) throw new Error("Checkout session not found");
    res.json({ session_id });
  } catch (error) {
    console.log(error);
  }
};

// Stripe subscription logic
exports.paymentSuccess = async (req, res) => {
  const { sessionId, user_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const subscriptionId = session.subscription;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const user = await findingUserById(user_id);
      const planId = subscription.plan.id;
      const planType = basic;
      const startDate = moment
        .unix(subscription.current_period_start)
        .format("YYYY-MM-DD");
      const endDate = moment
        .unix(subscription.current_period_end)
        .format("YYYY-MM-DD");
      const durationInSeconds =
        subscription.current_period_end - subscription.current_period_start;
      const durationInDays = moment
        .duration(durationInSeconds, "seconds")
        .asDays();
      const updatedUser = {
        planId: planId,
        startDate: startDate,
        endDate: endDate,
        planType: planType,
        planDuration: durationInDays,
      };
      await updateSubscription(user_id, updatedUser);
      return res.json({
        updatedUser,
        success: "Payment Successfully completed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.profilePic = async (req, res) => {
  try {
    const { _id } = req.params;
    const { filename } = req.file;
    const profilePic = await userProfilepic(_id, filename);
    if (!profilePic) throw new Error("Profile pic not uploaded");
    res.json({ success: "Uploaded successfully" });
  } catch (error) {
    console.log(error);
  }
};

// To get the available slots
exports.slots = async (req, res) => {
  const date = req.query.key1
  const _id = req.query.key2
  
  try {
    const slots = await findSlots(date,_id);
    res.json({ slots });
  } catch (error) {
    console.log(error);
  }
};

// To confirm user booked slot
exports.ConfirmSlot = async (req, res) => {
  try {
    const { userId } = req.body;
    const { slot } = req.body;
    const confirm = await BookedSlot(userId,slot);
    if (!confirm) throw new Error("Slot not confirmed");
    res.json({ success: "Slot booked successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadImage = async (req, res) => {
  const { _id } = req.params;
  const url = await uploadimage(req.body.image);
  const saveImg = await saveImgLink(_id, url);
  console.log(saveImg, "ooooo");
};
