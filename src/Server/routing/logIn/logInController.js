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
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const data = await loginInstance.logIn(req.body.email, req.body.password);
    const { token, role } = data;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Invalid username/email or password" });
    }

    res.cookie("tagline_auth", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 86400000,
      path: "/",
      domain: "localhost",
    });

    res.cookie("user_type", role, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 86400000,
      path: "/",
      domain: "localhost",
    });

    return res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

router.get("/loggedInPerson", async (req, res) => {
  const token = req.cookies.tagline_auth;

  if (!token) {
    return res.status(401).json({ error: "No authentication token found" });
  }
  const loggedInPerson = await loginInstance.getLoggedInUserData(token);
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
