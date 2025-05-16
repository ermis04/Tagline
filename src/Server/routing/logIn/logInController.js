/*
 * This Controller Conrols the API endpoint of LogIn.
 */

const express = require("express");
const router = express.Router();
const path = require("path");
const { validateLogIn } = require("./validator");
const { validationResult } = require("express-validator");
const LogIn = require("./LogIn");

const loginInstance = new LogIn();

router.post("/", validateLogIn, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const token = await loginInstance.logIn(req.body.email, req.body.password);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Invalid username/email or password" });
    }

    res.cookie("tagline_auth", token, {
      httpOnly: true,
      secure: false, // Disable in development
      sameSite: "lax", // Use 'none' in production with HTTPS
      maxAge: 86400000,
      path: "/",
      domain: "localhost", // Explicitly set domain
    });
    return res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

router.get("/loggedInPerson", (req, res) => {
  const token = req.cookies.tagline_auth; // Match your cookie name

  if (!token) {
    return res.status(401).json({ error: "No authentication token found" });
  }
  const loggedInPerson = loginInstance.getLoggedInUser(token);

  res.json({
    PersonId: loggedInPerson.PersonId,
    first_name: loggedInPerson.first_name,
    last_name: loggedInPerson.last_name,
    email: loggedInPerson.email,
    username: loggedInPerson.username,
    src: loggedInPerson.src,
    role: loggedInPerson.role,
    points_collected: loggedInPerson.points_collected,
  });
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../..", "Client", "LogIn"));
});

module.exports = router;
