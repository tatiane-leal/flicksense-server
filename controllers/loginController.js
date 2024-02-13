const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const userData = req.body;

  const isUserRegistered = await User.findOne({
    email: userData.email,
  }).exec();

  if (!isUserRegistered)
    return res.status(401).json({ message: "Email or password invalid" });

  // Compare submitted password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(
    userData.password,
    isUserRegistered.password
  );

  // If user valid, authenticate user
  if (isPasswordValid) {
    const roles = Object.values(isUserRegistered.roles).filter(Boolean);
    
    // create JWT
    const accessToken = jwt.sign(
      {
        UserInfo: {
          // sub: isUserRegistered._id,
          email: isUserRegistered.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    
    const refreshToken = jwt.sign(
      { email: isUserRegistered.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Saving refreshToken with current user
    isUserRegistered.refreshToken = refreshToken;

    const result = await isUserRegistered.save();

    console.log(result);
    console.log(roles);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    return res.status(401).json({ message: "Email or password invalid" });
  }
};

module.exports = { handleLogin };
