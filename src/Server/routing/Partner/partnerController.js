/*
 * This Controller Conrols the API endpoint of User.
 */
const path = require("path");
const express = require("express");
const router = express.Router();

const Partner = require("./Partner");
const Ad = require("../Ad/Ad");
const LogIn = require("../logIn/LogIn");

router.get("/data", async (req, res) => {
  const login = new LogIn();
  const partner = new Partner();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);
  const partnerData = await partner.getPartnerData(personId);
  res.json(partnerData);
});

router.get("/balance", async (req, res) => {
  const login = new LogIn();
  const partner = new Partner();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);
  const balance = await partner.checkBalance(personId);

  res.json(balance);
});

router.get("/balance/add", async (req, res) => {
  // URL should have the amout as a query parameter, e.g., /partner/balance/add?amount=100
  const login = new LogIn();
  const partner = new Partner();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);

  const amount = req.query.amount;
  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  // ~~~~~~~~~~~~~~~~~ Contact bank API!~~~~~~~~~~~~~

  const newTotal = await partner.addFunds(personId, amount);

  res.json(newTotal);
});

router.get("/balance/charge", async (req, res) => {
  // URL should have the amout as a query parameter, e.g., /partner/balance/charge?amount=100
  const login = new LogIn();
  const partner = new Partner();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);

  const amount = req.query.amount;
  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }
  const newTotal = await partner.chargeFunds(personId, amount);

  res.json(newTotal);
});

router.get("/statistics", async (req, res) => {
  const login = new LogIn();
  const partner = new Partner();
  const ad = new Ad();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);
  const partnerData = await partner.getPartnerData(personId);

  const adStatistics = await ad.getAdStatistics(partnerData.PartnerID);

  res.json(adStatistics);
});

router.post("/update", async (req, res) => {
  const login = new LogIn();
  const partner = new Partner();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);

  const updatedPartner = await partner.updatePartnerData(personId, req.body);

  res.json(updatedPartner);
});

router.get("/AddFunds", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../..",
      "Client",
      "Partner/AddFunds",
      "Addfunds.html"
    )
  );
});

router.get("/profile", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../..", "Client", "Partner/Profile", "index.html")
  );
});

router.get("/profile/edit", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../..", "Client", "Partner/Profile", "edit.html")
  );
});

router.get("/createAd", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../..",
      "Client",
      "Partner/CreateAd",
      "createAd.html"
    )
  );
});

router.get("/manageAd", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../..",
      "Client",
      "Partner/ManageAd",
      "manageAd.html"
    )
  );
});

router.get("/ManageAds", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../..",
      "Client",
      "Partner/ManageAds",
      "manageAds.html"
    )
  );
});

module.exports = router;
