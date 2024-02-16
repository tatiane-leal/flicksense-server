require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3000;

connectToDatabase();

const app = express();

const posts = [
  {
    message: "Hello",
  },
  {
    message: "Hiee",
  },
];

// Middlewares
// Handle options credentials check - before CORS!
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//middleware for cookies
app.use(cookieParser());

// Routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login")); // authenticate
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));
app.use("/profile", require("./routes/profile"));
app.use("/post", require("./routes/post"));
app.use("/analysis", require("./routes/analysis"));

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(3000, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
