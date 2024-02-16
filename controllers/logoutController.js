const User = require("../model/User");

const logoutController = async (req, res) => {
  const { jwt: refreshToken } = req.cookies;

  console.log("handleLogout > refreshToken", refreshToken);
  if (!refreshToken) {
    return res.sendStatus(204);
  }

  try {
    const result = await User.findOneAndUpdate(
      { refreshToken },
      { $set: { refreshToken: "" } },
      { new: true }
    );

    if (!result) {
      console.log("No refresh token found to update");
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("handleLogout", result);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro no logout:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = logoutController;
