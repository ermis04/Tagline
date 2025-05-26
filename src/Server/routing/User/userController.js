/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();
const path = require("path");

const User = require("./User");
const Location = require("../Location/Location");
const Post = require("../Post/Post");
const LogIn = require("../logIn/LogIn");
const Review = require("../Review/Review");

router.get("/data", async (req, res) => {
  const login = new LogIn();
  const user = new User();
  const location = new Location();
  const post = new Post();

  const token = req.cookies.tagline_auth; // For knowing the logged in user

  // Get the logged in user data from the token
  const userData = await user.getUserData(
    await login.getLoggedInPersonId(token)
  );
  const locations = await location.getLocations(userData.UserID);
  const posts = await post.getPosts();

  res.json({ ...userData, locations, posts });
});

router.get("/profile/data", async (req, res) => {
  // If the user is logged in, get the user ID from the token
  // If the user is not logged in, get the user ID from the URL, need to do this: /user/profile?user_id=1
  const login = new LogIn();
  const user = new User();
  const post = new Post();
  const review = new Review();

  try {
    let userId;
    // Use ID from URL if present, otherwise from token
    if (req.query.user_id) {
      userId = await login.getPersonIdfromUserId(Number(req.query.user_id));
      console.log("User ID from query:", userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID." });
      }
    } else {
      const token = req.cookies.tagline_auth;
      userId = await login.getLoggedInPersonId(token);
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated." });
      }
    }

    const userData = await user.getUserData(userId);
    console.log("User Data:", userData);
    const posts = (await post.getUserPosts(userData.UserID)) || [];
    const reviews = (await review.getUserReviews(userData.UserID)) || [];

    res.json({ ...userData, posts, reviews });
  } catch (error) {
    console.error("Error in /profile route:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/profile/edit", async (req, res) => {
  const login = new LogIn();
  const user = new User();

  const token = req.cookies.tagline_auth;

  const response = await user.updateUserData(
    await login.getLoggedInPersonId(token),
    req.body
  );

  res.json(response);
});

router.get("/friends/get", async (req, res) => {
  const user = new User();
  const login = new LogIn();

  const token = req.cookies.tagline_auth;
  const userData = await user.getUserData(
    await login.getLoggedInPersonId(token)
  );
  const friends = await user.getFriends(userData.UserID);

  res.json(friends);
});

router.get("/friends/add", async (req, res) => {
  // URL needs to have the friend_id as a query parameter
  // Example: /user/friends/add?friend_id=1
  const user = new User();
  const login = new LogIn();

  const token = req.cookies.tagline_auth;
  const userData = await user.getUserData(
    await login.getLoggedInPersonId(token)
  );

  const friendId = req.query.friend_id;

  const friends = await user.addFriend(userData.UserID, friendId);

  res.json(friends);
});

router.get("/friends/remove", async (req, res) => {
  // URL needs to have the friend_id as a query parameter
  // Example: /user/friends/remove?friend_id=1
  const user = new User();
  const login = new LogIn();

  const token = req.cookies.tagline_auth;
  const userData = await user.getUserData(
    await login.getLoggedInPersonId(token)
  );

  const friendId = req.query.friend_id;
  const friends = await user.removeFriend(userData.UserID, friendId);

  res.json(friends);
});

router.get("/friends/leaderboard", async (req, res) => {
  const user = new User();
  const login = new LogIn();

  const token = req.cookies.tagline_auth;
  const userData = await user.getUserData(
    await login.getLoggedInPersonId(token)
  );

  const leaderboard = await user.getLeaderboard(userData.UserID);
  res.json(leaderboard);
});

router.get("/profile", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../..",
      "Client",
      "User/Profile",
      "viewprofile.html"
    )
  );
});

router.get("/profile/edit", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../..",
      "Client",
      "User/Profile",
      "editprofile.html"
    )
  );
});

module.exports = router;
