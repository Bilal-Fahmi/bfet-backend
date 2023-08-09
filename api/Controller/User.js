const { userProfile } = require("../services/user");

exports.Profile = async (req, res) => {
  const { uuid } = req.body;
  try {
      const user = await userProfile(uuid)
      if (!user) throw new Error('User not found')
      res.json({user})
  } catch (error) {
    console.log(error);
  }
};
