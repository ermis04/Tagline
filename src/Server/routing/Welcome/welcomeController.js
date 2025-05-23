const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Client", "Welcome", "index.html")
  );
});

router.get(
  "/static",
  express.static(path.join(__dirname, "../../../Client/Welcome"))
);

module.exports = router;
