/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const Partner = require("../Partner/Partner");
const LogIn = require("../logIn/LogIn");
const Ad = require("../Ad/Ad");

router.get("/all", async (req, res) => {
  const partner = new Partner();
  const login = new LogIn();
  const ad = new Ad();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const personData = await partner.getPartnerData(
    await login.getLoggedInPersonId(token)
  );
  const ads = await ad.getAds(personData.PartnerID);

  res.json(ads);
});

router.get("/data", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Ad ID: like this: /ad/getAdData?ad_id=1
  const ad = new Ad();
  const ad_id = req.query.ad_id;

  const adData = await ad.getAdData(ad_id);

  res.json(adData);
});

router.get("/collect", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Ad ID: like this: /ad/getAdData?ad_id=1&event="click"
  const ad = new Ad();
  const ad_id = req.query.ad_id;
  const event = req.query.event; //Should be click or view

  const adData = await ad.updateAdData(ad_id, event);

  res.json({ message: "Ad data updated successfully", adData });
});

router.post("/create", async (req, res) => {
  const partner = new Partner();
  const login = new LogIn();
  const ad = new Ad();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const personData = await partner.getPartnerData(
    await login.getLoggedInPersonId(token)
  );
  const ads = await ad.createAd(personData.PartnerID, req.body);

  res.json(ads);
});

router.get("/test", async (req, res) => {
  // THE URL SHOULD INCLUDE THE Location ID: like this: /location?location_id=1
  const partner = new Partner();
  const login = new LogIn();
  const ad = new Ad();

  const partner_id = req.query.partner_id; // Get the location id from the url
  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const personData = await partner.getPartnerData(
    await login.getLoggedInPersonId(token)
  );
  const ads = await ad.getAdStatistics(partner_id);

  res.json(ads);
});

module.exports = router;
