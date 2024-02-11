const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("user, password? ", email, password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Check if user already exists
  const duplicate = await User.findOne({ "email": email }).exec();

  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // Encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create and Store the new user
    const result = await User.create({ 
      "email": email,
      "password": hashedPwd
     });

     console.log(result);

    res.status(201).json({"success": `New user ${email} created!`});

  } catch (err) {
    res.status(500).json({ "message": err.message });
  }
};

module.exports = { handleNewUser };