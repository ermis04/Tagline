/*
 * This Controller Conrols the API endpoint of User.
 */

const db = require("../../db");
const express = require("express");
const router = express.Router();
const Login = require("../logIn/LogIn");
const User = require("../User/User");
const Review = require("./Review");

router.get("/", async (req, res) => {
  const review = new Review();
  const reviews = await review.get_reviews();
  res.json(reviews);
});

router.get("/userReviews", async (req, res) => {
  const login = new Login();
  const review = new Review();
  const user = new User();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);
  const userData = await user.getUserData(personId);

  const reviews = await review.getUserReviews(userData.UserID);

  res.json(reviews);
});

router.post("/edit", async (req, res) => {
  // must include review_id in the query parameter lik this: /edit?review_id=1
  // must include the body of the request like this: { "Text": "new text", "Rating": 5 }
  const login = new Login();
  const review = new Review();
  const user = new User();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);
  const userData = await user.getUserData(personId);

  const reviews = await review.editReview(
    req.query.review_id,
    userData.UserID,
    req.body
  );

  res.json(reviews);
});

router.get("/delete", async (req, res) => {
  // must include review_id in the query parameter lik this: /delete?review_id=1
  // must include the body of the request like this: { "Text": "new text", "Rating": 5 }
  const login = new Login();
  const review = new Review();
  const user = new User();

  const token = req.cookies.tagline_auth;
  const personId = await login.getLoggedInPersonId(token);
  const userData = await user.getUserData(personId);

  const reviews = await review.deleteReview(
    req.query.review_id,
    userData.UserID
  );

  res.json(reviews);
});

router.post("/", async (req, res) => {
  try {
    const login = new Login();
    const review = new Review();
    const user = new User();

    const token = req.cookies.tagline_auth;
    const personId = await login.getLoggedInPersonId(token);
    const userData = await user.getUserData(personId);

    const reviewData = review.createReview(userData.UserID, req.body);

    console.log("db review added", JSON.stringify(reviewData));
    res.status(201).json({ success: true, reviewData });
  } catch (err) {
    console.error("DB insert error:", err);
    res.status(500).json({ success: false, error: "Failed to add review" });
  }
});

router.post("/approve", async (req, res) => {
  try {
    const { review_id } = req.body;
    console.log("Received review_id:", review_id); // Debugging log

    const numericReviewId = Number(review_id);
    if (isNaN(numericReviewId)) {
      console.error("Invalid review_id:", review_id); // Debugging log
      return res
        .status(400)
        .json({ success: false, message: "Invalid review_id" });
    }

    console.log(
      "Executing query:",
      `UPDATE Review SET status = 'Approved' WHERE ReviewID = ${numericReviewId}`
    );
    const [result] = await db.query(
      `UPDATE Review SET status = 'Approved' WHERE ReviewID = ?`,
      [numericReviewId]
    );
    console.log("Database update result:", result); // Debugging log

    if (result.affectedRows === 0) {
      console.error(
        "No rows updated. ReviewID might not exist:",
        numericReviewId
      ); // Debugging log
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, message: "Review approved successfully." });
  } catch (error) {
    console.error("Error approving review:", error);
    res
      .status(500)
      .json({ success: false, message: "Error approving review." });
  }
});

router.post("/reject", async (req, res) => {
  try {
    const { review_id } = req.body;
    console.log("Received review_id:", review_id); // Debugging log

    const numericReviewId = Number(review_id);
    if (isNaN(numericReviewId)) {
      console.error("Invalid review_id:", review_id); // Debugging log
      return res
        .status(400)
        .json({ success: false, message: "Invalid review_id" });
    }

    console.log(
      "Executing query:",
      `UPDATE Review SET status = 'Rejected' WHERE ReviewID = ${numericReviewId}`
    );
    const [result] = await db.query(
      `UPDATE Review SET status = 'Rejected' WHERE ReviewID = ?`,
      [numericReviewId]
    );
    console.log("Database update result:", result); // Debugging log

    if (result.affectedRows === 0) {
      console.error(
        "No rows updated. ReviewID might not exist:",
        numericReviewId
      ); // Debugging log
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, message: "Review rejected successfully." });
  } catch (error) {
    console.error("Error rejecting review:", error);
    res
      .status(500)
      .json({ success: false, message: "Error rejecting review." });
  }
});

module.exports = router;
