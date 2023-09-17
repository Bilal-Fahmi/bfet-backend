const {
  userProfile,
  saveFileNameExpert,
  updateDescp,
  mindexp,
  bodyexp,
  createBlog,
  viewBlogs,
  singleBlog,
  updateSlot,
  singleExpert,
  singleExpBlog,
  expertName,
} = require("../services/user");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
  console.log(req);
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
  } catch (error) {
    console.log(error);
  }
};

// To create blog when needed by expert
exports.createBlog = async (req, res) => {
  try {
    console.log(req.file);
    const { _id } = req.params;
    const { title, summary, content } = req.body;
    const { filename } = req.file;
    const blog = await createBlog(_id, title, summary, content, filename);
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

// To update the slots the is selected by the expert
exports.expertSlots = async (req, res) => {
  try {
    const { _id } = req.params;
    const slot = req.body;
    const Slots = await updateSlot(_id, slot);
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
    console.log(error);
  }
};

// To show expert name in blog page
exports.expertName = async (req, res) => {
  try {
    console.log(req.params);
    const { _id } = req.params;
    const expert = await expertName(_id);
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
exports.paymentIntent = async (req, res) => {
  const amount = 2000;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "inr",
      amount: amount,
      payment_method_type: [ card ],
    });
    const clientSecret=paymentIntent.client_secret
    res.json({ clientSecret,message:"Payment initiated successfully" });
  } catch (error) {
    console.log(error);
  }
};
