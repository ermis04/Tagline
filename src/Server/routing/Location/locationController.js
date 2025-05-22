/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const User = require("../User/User");
const LogIn = require("../logIn/LogIn");
const Location = require("../Location/Location");

router.get("/data", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Location ID: like this: /location?location_id=1
  const user = new User();
  const login = new LogIn();
  const location = new Location();

  const location_id = req.query.location_id; // Get the location id from the url
  const token = req.cookies.tagline_auth; // For knowing the logged in user

  const userData = await user.getUserData(await login.getLoggedInUserId(token)); // Get the logged in user data from the token
  const pois = await location.getLocationPOIs(location_id);
  const locationData = await location.getLocationData(
    location_id,
    userData.UserID
  );
  res.json({ ...userData, pois, locationData });
});

module.exports = router;
