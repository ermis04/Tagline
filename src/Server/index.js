const express = require("express");
const path = require("path");
const db = require("./db");
const app = express();
const registerController = require("./routing/Register/registerController");
const logInController = require("./routing/logIn/logInController");

app.use(express.json()); // To accept JSON data

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/register", registerController);
app.use("/logIn", logInController);

app.use(express.static(path.join(__dirname, "../Client")));

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
