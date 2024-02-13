const User = require("../model/User");

const handleProfile = async (req, res) => {
  try {
    // Include only email and roles in the json response
    const users = await User.findById(req.params.id, { email: 1, roles: 1 }).exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleProfile };
