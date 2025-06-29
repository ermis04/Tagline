/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();
const path = require("path");

const User = require("../User/User");
const LogIn = require("../logIn/LogIn");
const Location = require("../Location/Location");

router.get("/data", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Location ID: like this: /location/data?location_id=1
  const user = new User();
  const login = new LogIn();
  const location = new Location();

  const location_id = req.query.location_id; // Get the location id from the url
  const token = req.cookies.tagline_auth; // For knowing the logged in user

  console.log("location_id", location_id);

  const userData = await user.getUserData(
    await login.getLoggedInPersonId(token)
  ); // Get the logged in user data from the token
  const pois = await location.getLocationPOIs(location_id);
  const locationData = await location.getLocationData(
    location_id,
    userData.UserID
  );
  console.log("locationData", locationData);
  console.log("pois", pois);
  console.log("userData", userData);
  res.json({ ...userData, pois, locationData });
});

router.get("/dataPure", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Location ID: like this: /location/data?location_id=1
  const location = new Location();

  const location_id = req.query.location_id; // Get the location id from the url

  const pois = await location.getLocationPOIs(location_id);
  const locationData = await location.getLocationDataPure(location_id);
  res.json({ pois, locationData });
});

router.get("/all", async (req, res) => {
  const location = new Location();
  const location_id = req.query.location_id; // Get the location id from the url
  const locations = await location.getLocationsPure();
  res.json(locations);
});

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../..", "Client", "User/Location", "location.html")
  );
});

module.exports = router;
