const db = require("../../db");

class Review {
  getUserReviews(userId) {} // Returns all the reviews by a user

  // Returns all the reviews related to a POI
  async getPoiReviews(poiId) {
    const res = await db.query("select * from review where poiid = ?", [poiId]);
    return res[0];
  }

  createReview() {}
  editReview() {} // Edit review by user
  deleteReview() {} // Delete review by user
  #shareAsPost() {} // Share review as post
}

module.exports = Review;
