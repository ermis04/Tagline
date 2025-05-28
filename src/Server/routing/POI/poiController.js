/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();
const path = require("path");

const User = require("../User/User");
const LogIn = require("../logIn/LogIn");
const Review = require("../Review/Review");
const Ad = require("../Ad/Ad");
const Poi = require("../POI/Poi");

router.get("/data", async (req, res) => {
  // THE URL SHOULD INCLUDE THE POI ID: like this: /poi?poi_id=1
  const user = new User();
  const login = new LogIn();
  const poi = new Poi();
  const ad = new Ad();
  const review = new Review();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const poi_id = req.query.poi_id; // Get the POI id from the url
  if (!poi_id) {
    return res.status(400).json({ error: "Poi ID is required in the url" });
  }

  const userData = await user.getUserData(
    await login.getLoggedInPersonId(token)
  ); // Get the logged in user data from the token
  const poiData = await poi.getPoiData(poi_id, userData.UserID); // Get the POI data from the db
  const reviews = await review.getPoiReviews(poi_id); // Get the reviews of the POI from the db
  const ads = await ad.getAdsforPoi(poi_id); // Get the ads of the POI from the db

  res.json({ ...userData, poiData, reviews, ads });
});

router.get("/markVisited", async (req, res) => {
  // THE URL SHOULD INCLUDE THE POI ID: like this: /poi/markVisited?poi_id=1
  try {
    const user = new User();
    const login = new LogIn();
    const poi = new Poi();

    const token = req.cookies.tagline_auth; // For knowing the logged in user
    const poi_id = req.query.poi_id;

    if (!poi_id) {
      return res.status(400).json({ error: "Poi ID is required in the query" });
    }

    const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
    const userData = await user.getUserData(personId); // Get the user id from the person id
    await poi.markPoiAsVisitedByUser(poi_id, userData.UserID); // Update the POI visits count

    res.status(200).json({ message: "POI marked as visited" });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

router.get("/unmarkVisited", async (req, res) => {
  // THE URL SHOULD INCLUDE THE POI ID: like this: /poi/unmarkVisited?poi_id=1
  const user = new User();
  const login = new LogIn();
  const poi = new Poi();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const poi_id = req.query.poi_id;

  if (!poi_id) {
    return res.status(400).json({ error: "Poi ID is required in the query" });
  }

  const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
  const userData = await user.getUserData(personId);
  await poi.unmarkPoiAsVisitedByUser(poi_id, userData.UserID); // Update the POI visits count

  res.status(200).json({ message: "POI marked as not visited" });
});

router.post("/review", async (req, res) => {
  const formData = req.body;
  const { poi_id, review_text, rating, src, isPost } = formData;

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const personId = await login.getLoggedInPersonId(token); // Get the logged in user id from the token
  const userData = await user.getUserData(personId);
  await poi.unmarkPoiAsVisitedByUser(poi_id, userData.UserID); // Update the POI visits count
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "Client", "User/Poi", "Poi.html"));
});

router.get("/review", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../..", "Client", "User/Poi", "review.html")
  );
});

module.exports = router;
