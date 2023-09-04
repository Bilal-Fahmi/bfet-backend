const { userProfile, saveFileNameExpert } = require("../services/user");

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

exports.filemanage = async (req, res) => {
  const { _id } = req.params;
  const filename = req.file.filename;
  const selectedOption = req.body.selectedOption
  try {
    const user = await saveFileNameExpert(_id, filename,selectedOption);
    if (!user) throw new Error("File not saved");
    res.json({ success: "Filed saved" });
  } catch (error) {
    res.json({ error: error.message })
    
    console.log(error);
  }
};
