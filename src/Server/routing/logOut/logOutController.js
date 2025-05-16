const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("tagline_auth");
  res.status(200).json({ message: "Logged out successfully" });
});
module.exports = router;
