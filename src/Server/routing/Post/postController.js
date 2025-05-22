/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const Post = require("../Post/Post");

router.get("/", async (req, res) => {
  const post = new Post();
  const posts = await post.getPosts(); // Get all the posts from the db
  res.json(posts);
});

module.exports = router;
