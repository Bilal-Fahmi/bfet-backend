const {
  userProfile,
  saveFileNameExpert,
  updateDescp,
  mindexp,
  bodyexp,
  createBlog,
  viewBlogs,
  singleBlog,
} = require("../services/user");
const fs = require("fs");

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
    console.log(expert);
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
    console.log(expert);
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
    console.log(filename, "pathhh");
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
    console.log(blogs);
    res.json({ blogs });
  } catch (error) {
    console.log(error);
  } 
};

// To view specific blog
exports.singleblog = async(req, res)=> {
  try {
    const { _id } = req.params
    const blog = await singleBlog(_id)
    if (!blog) throw new Error(`Blog with this ${_id} not found`)
    res.json({blog})
  } catch (error) {
    console.log(error);
  }
}