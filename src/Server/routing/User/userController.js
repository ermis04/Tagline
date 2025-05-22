/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const User = require("./User");
const Location = require("../Location/Location");
const Post = require("../Post/Post");
const LogIn = require("../logIn/LogIn");

router.get("/data", async (req, res) => {
  const login = new LogIn();
  const user = new User();
  const location = new Location();
  const post = new Post();

  const token = req.cookies.tagline_auth; // For knowing the logged in user

  // Get the logged in user data from the token
  const userData = await user.getUserData(await login.getLoggedInUserId(token));
  const locations = await location.getLocations();
  const posts = await post.getPosts();

  res.json({ ...userData, locations, posts });
});

module.exports = router;
