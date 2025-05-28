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

router.post("/user", validateRegister, async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const success = await registerInstance.registerUser(req.body, "USER");
    if (!success) {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

router.post("/partner", validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await registerInstance.registerUser(req.body, "PARTNER");
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

router.post("/moderator", validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await registerInstance.registerUser(req.body, "MODERATOR");
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

router.get("/", (req, res) => {
  console.log("Register page requested");
  res.sendFile(
    path.join(__dirname, "../..", "Client", "Register", "register1.html")
  );
});

router.get("/partner", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../..",
      "Client",
      "RegisterPartner",
      "registerPartner1.html"
    )
  );
});

module.exports = router;
