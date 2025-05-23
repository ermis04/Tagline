/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const Moderator = require("./Moderator");
const Location = require("../Location/Location");
const Post = require("../Post/Post");
const LogIn = require("../logIn/LogIn");

router.get("/data", async (req, res) => {
  const login = new LogIn();
  const moderator = new Moderator();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  // Get the logged in user data from the token
  const moderatorData = await moderator.getModeratorData(
    await login.getLoggedInUserId(token)
  );
  res.json(moderatorData);
});

router.get("/contentForModeration", async (req, res) => {
  const moderator = new Moderator();

  const postsandreviews = await moderator.getPostsAndReviewsForModeration();
  res.json(postsandreviews);
});

router.get("/approveReview", async (req, res) => {
  // need to have the review id in the URL query
  // For example: /moderator/approveReview?review_id=1
  const moderator = new Moderator();

  const review_id = req.query.review_id;
  const approved = await moderator.approveReview(review_id);
  if (approved) {
    res.status(200).json({ message: "Review approved successfully" });
  } else {
    res.status(500).json({ message: "Failed to approve review" });
  }
});

router.get("/rejectReview", async (req, res) => {
  // need to have the review id in the URL query
  // For example: /moderator/rejectReview?review_id=1
  const moderator = new Moderator();
  const login = new LogIn();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const moderatorData = await moderator.getModeratorData(
    await login.getLoggedInUserId(token)
  );

  const review_id = req.query.review_id;
  const approved = await moderator.rejectReview(review_id, moderatorData.ModID);
  if (approved) {
    res.status(200).json({ message: "Review rejected successfully" });
  } else {
    res.status(500).json({ message: "Failed to reject review" });
  }
});

router.get("/acceptPost", async (req, res) => {
  // need to have the post id in the URL query
  // For example: /moderator/rejectPost?post_id=1
  const moderator = new Moderator();

  const post_id = req.query.post_id;
  const approved = await moderator.acceptPost(post_id);
  if (approved) {
    res.status(200).json({ message: "Post rejected successfully" });
  } else {
    res.status(500).json({ message: "Failed to reject post" });
  }
});

router.get("/rejectPost", async (req, res) => {
  // need to have the post id in the URL query
  // For example: /moderator/rejectPost?post_id=1
  const moderator = new Moderator();
  const login = new LogIn();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const moderatorData = await moderator.getModeratorData(
    await login.getLoggedInUserId(token)
  );

  const post_id = req.query.post_id;
  const approved = await moderator.rejectPost(post_id, moderatorData.ModID);
  if (approved) {
    res.status(200).json({ message: "Post rejected successfully" });
  } else {
    res.status(500).json({ message: "Failed to reject post" });
  }
});

router.get("/getAdsForModeration", async (req, res) => {
  const moderator = new Moderator();
  const ads = await moderator.getAdsForModeration();
  res.json(ads);
});

router.get("/approveAd", async (req, res) => {
  // need to have the ad id in the URL query
  // For example: /moderator/approveAd?ad_id=1
  const moderator = new Moderator();

  const ad_id = req.query.ad_id;
  const approved = await moderator.approveAd(ad_id);
  if (approved) {
    res.status(200).json({ message: "Ad approved successfully" });
  } else {
    res.status(500).json({ message: "Failed to approve ad" });
  }
});

router.get("/rejectAd", async (req, res) => {
  // need to have the ad id in the URL query
  // For example: /moderator/rejectAd?ad_id=1
  const moderator = new Moderator();

  const ad_id = req.query.ad_id;
  const rejected = await moderator.rejectAd(ad_id);
  if (rejected) {
    res.status(200).json({ message: "Ad rejected successfully" });
  } else {
    res.status(500).json({ message: "Failed to rejected ad" });
  }
});

router.get("/moderatePartners", async (req, res) => {
  const moderator = new Moderator();

  const partners = await moderator.getPartnersForModeration();
  if (partners) {
    res.status(200).json(partners);
  } else {
    res.status(500).json({ message: "Failed to rejected ad" });
  }
});

router.get("/approvePartner", async (req, res) => {
  // need to have the ad id in the URL query
  // For example: /moderator/approvePartner?partner_id=1
  const moderator = new Moderator();

  const partner_id = req.query.partner_id;
  const approved = await moderator.approvePartner(partner_id);
  if (approved) {
    res.status(200).json({ message: "Partner approved successfully" });
  } else {
    res.status(500).json({ message: "Failed to approve ad" });
  }
});

router.get("/rejectPartner", async (req, res) => {
  // need to have the ad id in the URL query
  // For example: /moderator/rejectPartner?partner_id=1
  const moderator = new Moderator();

  const partner_id = req.query.partner_id;
  const rejected = await moderator.rejectPartner(partner_id);
  if (rejected) {
    res.status(200).json({ message: "Partner rejected successfully" });
  } else {
    res.status(500).json({ message: "Failed to rejected ad" });
  }
});

module.exports = router;
