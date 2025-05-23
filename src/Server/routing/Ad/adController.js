/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const User = require("../User/User");
const LogIn = require("../logIn/LogIn");
const Ad = require("../Ad/Ad");

router.get("/data", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Location ID: like this: /location?location_id=1
  const user = new User();
  const login = new LogIn();
  const ad = new Ad();

  const AdID = req.query.AdID; // Get the location id from the url
  const token = req.cookies.tagline_auth; // For knowing the logged in user

  const partnerData = await partner.getPartnerData(await login.getLoggedInUserId(token)); // Get the logged in user data from the token
  const pois = await location.getLocationPOIs(location_id);
  const locationData = await location.getLocationData(
    location_id,
    partnerData.AdID
  );
  res.json({ ...userData, pois, locationData });
});

module.exports = router;
