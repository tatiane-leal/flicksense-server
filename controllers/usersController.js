const User = require("../model/User");

const handleUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleUsers };
