/*
 * This Controller Conrols the API endpoint of LogIn.
 */

const express = require("express");
const router = express.Router();
const path = require("path");
const { validateLogIn } = require("./validator");
const LogIn = require("./LogIn");

const loginInstance = new LogIn();

router.post("/", validateLogIn, (req, res) => {});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../..", "Client", "LogIn"));
});

module.exports = router;
