const db = require("../../db");

class Review {
  // Returns all the reviews by a user
  async getUserReviews(userId) {
    console.log("getUserReviews called with userId:", userId);
    try {
      const [rows] = await db.query(
        `
      SELECT 
        ReviewID,
        uploaded_by,
        Rating,
        Text,
        PoiID,
        uploadDate,
        DeletedBy,
        status_by_user,
        status
      FROM Review
      WHERE uploaded_by = ?
        AND status_by_user != 'DeletedByUser'
        AND status = 'Approved'
      ORDER BY uploadDate DESC
      `,
        [userId]
      );

      return rows;
    } catch (error) {
      console.error("Error in getUserReviews:", error);
      throw error;
    }
  }

  // Returns all the reviews related to a POI
  async getPoiReviews(poiId) {
    try {
      const [rows] = await db.query(
        `
      SELECT 
        r.*,
        p.username,
        p.src AS userPicture
      FROM Review r
      JOIN User u ON r.uploaded_by = u.UserID
      JOIN Person p ON u.PersonID = p.PersonID
      WHERE r.PoiID = ?
        AND r.status_by_user = 'Active'
        AND r.status = 'Approved'
      ORDER BY r.uploadDate DESC
      `,
        [poiId]
      );

      return rows;
    } catch (error) {
      console.error("Error in getPoiReviews:", error);
      throw error;
    }
  }

  async get_reviews() {
    const res = await db.query("select * from review");
    return res[0];
  }

  async createReview(UserID, reviewData) {
    const { rating, text, poiId, src, share_as_post } = reviewData;

    // Step 1: Insert the review
    const [result] = await db.query(
      `
    INSERT INTO Review (uploaded_by, Rating, Text, PoiID)
    VALUES (?, ?, ?, ?)
    `,
      [UserID, rating, text, poiId]
    );

    const reviewId = result.insertId;

    // Step 2: Optionally share as post
    if (share_as_post && src) {
      await this.#shareAsPost(UserID, {
        text,
        src: src,
        poiId: poiId,
      });
    }

    return { success: true, reviewId };
  }

  //edit review by user
  async editReview(reviewId, userId, updatedFields) {
    const { Text, Rating } = updatedFields;

    if (!Text && typeof Rating !== "number") {
      return { success: false, message: "Nothing to update" };
    }

    try {
      // Verify the user owns the review
      const [rows] = await db.query(
        `SELECT * FROM Review WHERE ReviewID = ? AND uploaded_by = ?`,
        [reviewId, userId]
      );

      if (rows.length === 0) {
        return {
          success: false,
          message: "Review not found or not owned by user",
        };
      }

      const updates = [];
      const values = [];

      if (Text !== undefined) {
        updates.push("Text = ?");
        values.push(Text);
      }

      if (Rating !== undefined) {
        updates.push("Rating = ?");
        values.push(Rating);
      }

      // Always update status and uploadDate
      updates.push("status_by_user = 'Edited'");
      updates.push("uploadDate = CURRENT_TIMESTAMP");

      values.push(reviewId, userId);

      const [result] = await db.query(
        `UPDATE Review SET ${updates.join(
          ", "
        )} WHERE ReviewID = ? AND uploaded_by = ?`,
        values
      );

      return { success: true, message: "Review updated successfully" };
    } catch (error) {
      console.error("Error in editReview:", error);
      throw error;
    }
  }

  // delete review by user
  async deleteReview(reviewId, userId) {
    console.log(
      `deleteReview called with reviewId: ${reviewId}, userId: ${userId}`
    );

    try {
      // Check if the review exists and belongs to the user
      const [rows] = await db.query(
        `SELECT ReviewID FROM Review WHERE ReviewID = ? AND uploaded_by = ? AND status_by_user != 'DeletedByUser'`,
        [reviewId, userId]
      );

      if (rows.length === 0) {
        return {
          success: false,
          message: "Review not found or already deleted",
        };
      }

      // Soft-delete the review by updating its status
      await db.query(
        `
      UPDATE Review
      SET status_by_user = 'DeletedByUser', uploadDate = CURRENT_TIMESTAMP
      WHERE ReviewID = ? AND uploaded_by = ?
      `,
        [reviewId, userId]
      );

      return { success: true, message: "Review deleted successfully" };
    } catch (error) {
      console.error("Error in deleteReview:", error);
      throw error;
    }
  }

  // Share review as post
  async #shareAsPost(userId, postData) {
    const { text, src, poiId } = postData;

    try {
      const [result] = await db.query(
        `
      INSERT INTO Post (uploaded_by, caption, src, PoiID)
      VALUES (?, ?, ?, ?)
      `,
        [userId, text, src, poiId]
      );

      return { success: true, postId: result.insertId };
    } catch (error) {
      console.error("Error in shareAsPost:", error);
      throw error;
    }
  }
}

module.exports = Review;
