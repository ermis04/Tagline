/*
 * This Controller Conrols the API endpoint of Post.
 */

const express = require("express");
const router = express.Router();
const Post = require("../Post/Post");
const User = require("../User/User");
const LogIn = require("../logIn/LogIn");

router.get("/all", async (req, res) => {
  const post = new Post();
  const posts = await post.getPosts(); // Get all the posts from the db
  res.json(posts);
});

router.get("/", async (req, res) => {
  // THE URL SHOULD INCLUDE THE post ID: like this: /post?post_id=1
  const post_id = req.query.post_id;

  const post = new Post();
  const postData = await post.getPostData(post_id); // Get the post data from the dbs

  if (!postData) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(postData);
});

router.get("/poi", async (req, res) => {
  // THE URL SHOULD INCLUDE THE poi ID, like this: /post/poi?poi_id=1
  const poi_id = req.query.poi_id;

  const post = new Post();
  const posts = await post.getPoiPosts(poi_id); // Get the posts related to the poi from the db
  if (!posts) {
    return res.status(404).json({ error: "No posts found for this POI" });
  }
  res.json(posts);
});

router.get("/location", async (req, res) => {
  // THE URL SHOULD INCLUDE THE location ID: like this: /post/location?location_id=1
  const location_id = req.query.location_id;

  const post = new Post();
  const posts = await post.getPostsBasedOnLocation(location_id); // Get the posts related to the location from the db
  if (!posts) {
    return res.status(404).json({ error: "No posts found for this location" });
  }
  res.json(posts);
});

router.get("/user", async (req, res) => {
  // THE URL SHOULD INCLUDE THE user ID: like this: /post/user?user_id=1
  const user_id = req.query.user_id;

  const post = new Post();
  const posts = await post.getUserPosts(user_id); // Get the posts related to the user from the db
  if (!posts) {
    return res.status(404).json({ error: "No posts found for this user" });
  }
  res.json(posts);
});

router.get("/delete", async (req, res) => {
  // THE URL SHOULD INCLUDE THE post ID: like this: /post/delete?post_id=1
  const post_id = req.query.post_id;
  if (!post_id) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  const user = new User();
  const login = new LogIn();
  const post = new Post();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
  const userData = await user.getUserData(personId);

  const deletedPost = await post.deletePost(post_id, userData.UserID); // Delete the post from the db
  if (!deletedPost) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(deletedPost);
});

router.post("/edit", async (req, res) => {
  // THE URL SHOULD INCLUDE THE post ID: like this: /post/edit?post_id=1
  //   and the new caption in the body, like this: { "newCaption": "...." }

  const post_id = req.query.post_id;
  const newCaption = req.body.newCaption;

  if (!post_id) {
    return res.status(400).json({ error: "Post ID is required" });
  }
  if (!newCaption) {
    return res.status(400).json({ error: "New caption is required" });
  }

  const user = new User();
  const login = new LogIn();
  const post = new Post();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
  const userData = await user.getUserData(personId);

  const editedPost = await post.editPost(post_id, userData.UserID, newCaption); // Edit the post in the db
  if (!editedPost) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(editedPost);
});

router.get("/like", async (req, res) => {
  // THE URL SHOULD INCLUDE THE post ID: like this: /post/like?post_id=1
  const post_id = req.query.post_id;

  if (!post_id) {
    return res.status(400).json({ error: "Post ID is required" });
  }
  const post = new Post();

  const likedPost = await post.likePost(post_id); //
  if (!likedPost) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(likedPost);
});

router.post("/comment", async (req, res) => {
  // THE URL SHOULD INCLUDE THE post ID: like this: /post/comment?post_id=1
  // and the comment in the body, like this: { "comment": "...." }

  const post_id = req.query.post_id;
  const comment = req.body.comment;

  if (!post_id) {
    return res.status(400).json({ error: "Post ID is required" });
  }
  if (!comment) {
    return res.status(400).json({ error: "New comment is required" });
  }

  const user = new User();
  const login = new LogIn();
  const post = new Post();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
  const userData = await user.getUserData(personId);

  const commented = await post.commentOnPost(post_id, userData.UserID, comment);

  if (!commented) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(commented);
});

router.get("/comment/delete", async (req, res) => {
  // THE URL SHOULD INCLUDE THE post ID and comment ID: like this: /post/comment/delete?comment_id=1
  const comment_id = req.query.comment_id;
  if (!comment_id) {
    return res.status(400).json({ error: "Comment ID is required" });
  }

  const user = new User();
  const login = new LogIn();
  const post = new Post();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
  const userData = await user.getUserData(personId);

  const removed = await post.deleteComment(comment_id, userData.UserID);

  if (!removed) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(removed);
});

router.get("/comment/edit", async (req, res) => {
  // THE URL SHOULD INCLUDE THE post ID and comment ID: like this: /post/comment/edit?comment_id=1
  // and the new comment in the body, like this: { "newComment": "...." }
  const comment_id = req.query.comment_id;
  const newComment = req.body.newComment;

  if (!comment_id) {
    return res.status(400).json({ error: "Comment ID is required" });
  }
  if (!newComment) {
    return res.status(400).json({ error: "New comment is required" });
  }

  const user = new User();
  const login = new LogIn();
  const post = new Post();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
  const userData = await user.getUserData(personId);

  const removed = await post.editComment(
    comment_id,
    userData.UserID,
    newComment
  );

  if (!removed) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(removed);
});

module.exports = router;
