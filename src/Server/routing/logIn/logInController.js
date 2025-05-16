/*
 * This Controller Conrols the API endpoint of LogIn.
 */

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {});

router.get("/", (req, res) => {
  res.send("Login screen");
});

module.exports = router;
