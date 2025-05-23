/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const Partner = require("../Partner/Partner");
const LogIn = require("../logIn/LogIn");
const Ad = require("../Ad/Ad");


router.get("/data", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Location ID: like this: /location?location_id=1
  const partner = new Partner();
  const login = new LogIn();
  const ad = new Ad();


  const AdID = req.query.AdID; // Get the location id from the url
  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const personData = await partner.getPartnerData(await login.getLoggedInUserId(token))
  const ads = await ad.getAds(personData.PartnerID);
 
  res.json(ads);
});

router.get("/test", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Location ID: like this: /location?location_id=1
  const partner = new Partner();
  const login = new LogIn();
  const ad = new Ad();


  const partner_id = req.query.partner_id; // Get the location id from the url
  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const personData = await partner.getPartnerData(await login.getLoggedInUserId(token))
  const ads = await ad.getAdStatistics(partner_id);
 
  res.json(ads);
});

module.exports = router;
