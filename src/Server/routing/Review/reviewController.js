/*
 * This Controller Conrols the API endpoint of User.
 */

const express = require("express");
const router = express.Router();
const Login = require("../logIn/LogIn");
const User = require("../User/User");

const Review = require("./Review");

router.get("/", async (req, res) => {
    const review = new Review();
    const reviews = await review.get_reviews()
    res.json(reviews);
});



router.post("/", async (req, res) => {
    const {
        uploaded_by,
        rating,
        text,
        poiId,
        deletedBy = null,
        statusByUser = null,
        status = 'active'
    } = req.body;

    try {
        const login = new Login();
        const review = new Review();
        const user = new User();

        const token = req.cookies.tagline_auth;
        const personId = await login.getLoggedInUserId(token);
        const userData = await user.getUserData(personId);

        const reviewData = review.createReview(userData.UserID, req.body);

        console.log("db review added", JSON.stringify(reviewData));
        res.status(201).json({ success: true, reviewData });
    } catch (err) {
        console.error("DB insert error:", err);
        res.status(500).json({ success: false, error: "Failed to add review" });
    }
});


module.exports = router;