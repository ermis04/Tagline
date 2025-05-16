/*
 * This Controller Conrols the API endpoint of Registration page.
 */

const express = require("express");
const router = express.Router();
const path = require("path");
const { validateRegister } = require("./validator");
const { validationResult } = require("express-validator");
const Register = require("./Register");

const registerInstance = new Register();

router.post("/", validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = await registerInstance.registerUser(req.body);
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../..", "Client", "register"));
});

module.exports = router;
