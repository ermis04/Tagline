/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();

const Partner = require("../Partner/Partner");
const LogIn = require("../logIn/LogIn");
const Ad = require("../Ad/Ad");

router.get("/all", async (req, res) => {
  try {
    console.log("GET /advertisement/all called"); // Debugging log
    const partner = new Partner();
    const login = new LogIn();
    const ad = new Ad();
    const ads = await ad.getAllPendingAds(); // Fetch all pending ads for moderation
    console.log("Fetched ads:", ads); // Debugging log
    res.json(ads);
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    res.status(500).json({ message: "Error fetching advertisements" });
  }

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const personData = await partner.getPartnerData(
    await login.getLoggedInPersonId(token)
  );
  const ads = await ad.getAds(personData.PartnerID);

  res.json(ads);
});

router.get("/partner/all", async (req, res) => {
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
  // THE URL SHOULD INCLUDE THE Ad ID: like this: /ad/collect?ad_id=1&event="click"
  const ad = new Ad();
  const ad_id = req.query.ad_id;
  const event = req.query.event; //Should be click or view

  const adData = await ad.updateAdData(ad_id, event);

  res.json({ message: "Ad data updated successfully", adData });
});

router.post("/create", async (req, res) => {
  console.log("niggaballs")
  const partner = new Partner();
  const login = new LogIn();
  const ad = new Ad();

  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const partnerData = await partner.getPartnerData(
    await login.getLoggedInPersonId(token)
  );

  if (partner.checkBalance() < req.body.cost) {
    return res.status(400).json({ message: "Not enough balance" });
  }

  const ads = await ad.createAd(partnerData.PartnerID, req.body);

  res.json(ads);
});

router.post("/edit", async (req, res) => {
  const partner = new Partner();
  const login = new LogIn();
  const ad = new Ad();

  const ad_id = req.query.ad_id;
  const token = req.cookies.tagline_auth; // For knowing the logged in user
  const partnerData = await partner.getPartnerData(
    await login.getLoggedInPersonId(token)
  );

  if (partner.checkBalance() < req.body.cost) {
    return res.status(400).json({ message: "Not enough balance" });
  }

  const ads = await ad.editAd(ad_id, partnerData.PartnerID, req.body);

  res.json(ads);
});

router.get("/delete", async (req, res) => {
  const ad = new Ad();
  const ad_id = req.query.ad_id; // Get the ad id from the url
  const ads = await ad.deleteAd(ad_id);
  res.json(ads);
});

router.get("/stats", async (req, res) => {
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

// Accept an advertisement for mod
router.post("/accept", async (req, res) => {
  try {
    const ad = new Ad();
    const ad_id = req.body.ad_id;

    const result = await ad.updateAdStatus(ad_id, "Approved");

    if (result.success) {
      res.json({ message: "Advertisement approved successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error approving advertisement:", error);
    res.status(500).json({ message: "Error approving advertisement" });
  }
});

// Reject an advertisement for mod
router.post("/reject", async (req, res) => {
  try {
    const ad = new Ad();
    const ad_id = req.body.ad_id;

    const result = await ad.updateAdStatus(ad_id, "Rejected");

    if (result.success) {
      res.json({ message: "Advertisement rejected successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error rejecting advertisement:", error);
    res.status(500).json({ message: "Error rejecting advertisement" });
  }
});

module.exports = router;
