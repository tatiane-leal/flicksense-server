const Post = require("../model/Post");

const handlePost = async (req, res) => {
  console.log(req.body.message);
  const newPost = new Post({
    message: req.body.message
  });

  try {
    const result = await Post.create({
      message: newPost.message,
    });

    console.log(result);

    res.status(201).json({ success: `New post created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handlePost };
