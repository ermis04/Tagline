const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./db");
const app = express();
const registerController = require("./routing/Register/registerController");
const logInController = require("./routing/logIn/logInController");
const logOutController = require("./routing/logOut/logOutController");
const userController = require("./routing/User/userController");
const poiController = require("./routing/POI/poiController");
const locationController = require("./routing/Location/locationController");
const postController = require("./routing/Post/postController");
const reviewController = require("./routing/Review/reviewController");
const moderatorController = require("./routing/Moderator/moderatorController");
const partnerController = require("./routing/Partner/partnerController");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/register", registerController);
app.use("/logIn", logInController);
app.use("/logOut", logOutController);
app.use("/user", userController);
app.use("/poi", poiController);
app.use("/location", locationController);
app.use("/posts", postController);
app.use("/reviews", reviewController);
app.use("/moderator", moderatorController);
app.use("/partner", partnerController);

app.use(express.static(path.join(__dirname, "../Client")));

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
