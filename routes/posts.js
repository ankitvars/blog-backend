const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}, "title excerpt createdAt"); // Fetch only necessary fields
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
});

// GET a specific post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: err.message });
  }
});

// POST a new post
router.post("/", async (req, res) => {
  const { title, excerpt, content } = req.body;
  const post = new Post({ title, excerpt, content });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating post", error: err.message });
  }
});

// PUT update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.title = req.body.title || post.title;
    post.excerpt = req.body.excerpt || post.excerpt;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating post", error: err.message });
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting post', error: err.message });
    }
});


module.exports = router;
