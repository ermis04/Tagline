/*
 * This Controller Conrols the API endpoint of Registration page.
 */

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {});

router.get("/", (req, res) => {
  res.send("Registration screen");
});

module.exports = router;
