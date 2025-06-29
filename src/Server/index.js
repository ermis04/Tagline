const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
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
const adController = require("./routing/Ad/adController");
const partnerController = require("./routing/Partner/partnerController");
const welcomeController = require("./routing/Welcome/welcomeController");

// require("./initTables"); // This is used to initialize the tables int the database.

app.use(express.json());
app.use(cookieParser());

app.get("/", welcomeController);
app.use("/register", registerController);
app.use("/logIn", logInController);
app.use("/logOut", logOutController);
app.use("/user", userController);
app.use("/poi", poiController);
app.use("/location", locationController);
app.use("/posts", postController);
app.use("/reviews", reviewController);
app.use("/moderator", moderatorController);
app.use("/advertisement", adController);
app.use("/partner", partnerController);

// Serve static files from the Client directory
app.use(express.static(path.join(__dirname, "./Client")));
app.use("/static", express.static(path.join(__dirname, "./Client/Welcome")));
app.use(
  "/register/static",
  express.static(path.join(__dirname, "./Client/Register"))
);
app.use(
  "/register/partner/static",
  express.static(path.join(__dirname, "./Client/RegisterPartner"))
);
app.use(
  "/location/static",
  express.static(path.join(__dirname, "./Client/User/Location"))
);

app.use(
  "/poi/static",
  express.static(path.join(__dirname, "./Client/User/Poi"))
);
app.use(
  "/user/profile/static",
  express.static(path.join(__dirname, "./Client/User/Profile"))
);
app.use(
  "/posts/static",
  express.static(path.join(__dirname, "./Client/User/Post"))
);

app.use(
  "/user/friends/static",
  express.static(path.join(__dirname, "./Client/User/Friends"))
);

app.use(
  "/partner/static",
  express.static(path.join(__dirname, "./Client/Partner"))
);

app.use(
  "/partner/AddFunds/static",
  express.static(path.join(__dirname, "./Client/Partner/AddFunds"))
);

app.use(
  "/partner/profile/static",
  express.static(path.join(__dirname, "./Client/Partner/Profile"))
);

app.use(
  "/partner/CreateAd/static",
  express.static(path.join(__dirname, "./Client/Partner/CreateAd"))
);

app.use(
  "/partner/ManageAd/static",
  express.static(path.join(__dirname, "./Client/Partner/ManageAd"))
);

app.use(
  "/partner/ManageAds/static",
  express.static(path.join(__dirname, "./Client/Partner/ManageAds"))
);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
