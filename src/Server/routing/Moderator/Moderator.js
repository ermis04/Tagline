const db = require("../../db");
class Moderator {
  // Get moderator data
  async getModeratorData(personId) {
    console.log("getModeratorData called with personId:", personId);
    try {
      const [rows] = await db.query(
        `
      SELECT 
        m.ModID,
        p.PersonID,
        p.username,
        p.first_name,
        p.last_name,
        p.email,
        p.src,
        p.Role
      FROM Person p
      JOIN Moderator m ON p.PersonID = m.PersonID
      WHERE p.PersonID = ?
      LIMIT 1
    `,
        [personId]
      );

      if (rows.length === 0) {
        return null; // No moderator found with this ID
      }

      return rows[0];
    } catch (error) {
      console.error("Error in getModeratorData:", error);
      throw error;
    }
  }

  // Get all posts and reviews with statys pending
  async getPostsAndReviewsForModeration() {
    try {
      // Get pending posts with uploader info
      const [posts] = await db.query(`
      SELECT 
        p.PostID,
        p.caption,
        p.src AS postSrc,
        p.uploadDate,
        poi.POI_name,
        per.PersonID,
        per.username,
        per.first_name,
        per.last_name,
        per.src AS userSrc
      FROM Post p
      JOIN User u ON p.uploaded_by = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      JOIN POI poi ON p.PoiID = poi.POIID
      WHERE p.status = 'Pending' AND p.status_by_user = 'Active'
      ORDER BY p.uploadDate DESC
    `);

      // Get pending reviews with uploader info
      const [reviews] = await db.query(`
      SELECT 
        r.ReviewID,
        r.Rating,
        r.Text,
        r.uploadDate,
        poi.POI_name,
        per.PersonID,
        per.username,
        per.first_name,
        per.last_name,
        per.src AS userSrc
      FROM Review r
      JOIN User u ON r.uploaded_by = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      JOIN POI poi ON r.PoiID = poi.POIID
      WHERE r.status = 'Pending' AND r.status_by_user = 'Active'
      ORDER BY r.uploadDate DESC
    `);

      return {
        posts,
        reviews,
      };
    } catch (error) {
      console.error("Error in getPostsAndReviewsForModeration:", error);
      throw error;
    }
  }

  //approve review
  async approveReview(reviewID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Review
      SET status = 'Approved'
      WHERE ReviewID = ?
    `,
        [reviewID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Review not found or already moderated.");
      }

      return { success: true, message: "Review approved." };
    } catch (error) {
      console.error("Error in approveReview:", error);
      throw error;
    }
  }

  //reject review
  async rejectReview(reviewID, modID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Review
      SET status = 'Rejected', DeletedBy = ?
      WHERE ReviewID = ?
    `,
        [modID, reviewID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Review not found or already moderated.");
      }

      return { success: true, message: "Review rejected." };
    } catch (error) {
      console.error("Error in rejectReview:", error);
      throw error;
    }
  }

  // for rejecting a post
  async rejectPost(postID, modID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Post
      SET status = 'Rejected', DeletedBy = ?
      WHERE PostID = ?
    `,
        [modID, postID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Post not found or already moderated.");
      }

      return { success: true, message: "Post rejected successfully." };
    } catch (error) {
      console.error("Error in rejectPost:", error);
      throw error;
    }
  }
  // for rejecting a post
  async acceptPost(postID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Post
      SET status = 'Accepted'
      WHERE PostID = ?
    `,
        [postID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Post not found or already moderated.");
      }

      return { success: true, message: "Post rejected successfully." };
    } catch (error) {
      console.error("Error in rejectPost:", error);
      throw error;
    }
  }

  // Get ads for moderation
  async getAdsForModeration() {
    try {
      const [ads] = await db.query(`
      SELECT 
        a.AdID,
        a.title,
        a.Description,
        a.start_date,
        a.end_date,
        a.cost,
        p.username,
        p.PersonID,
        p.src AS src
      FROM Ad a
      JOIN User u ON a.uploaded_by = u.UserID
      JOIN Person p ON u.PersonID = p.PersonID
      WHERE a.status = 'Pending'
      ORDER BY a.start_date DESC
    `);

      return ads;
    } catch (error) {
      console.error("Error in getAdsForModeration:", error);
      throw error;
    }
  }
  // Approve ad
  async approveAd(adID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Ad
      SET status = 'Approved'
      WHERE AdID = ?
    `,
        [adID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Ad not found or already moderated.");
      }

      return { success: true, message: "Ad approved." };
    } catch (error) {
      console.error("Error in approveAd:", error);
      throw error;
    }
  }

  // Reject ad
  async rejectAd(adID) {
    try {
      const [result] = await db.query(
        `
      UPDATE AD
      SET status = 'Rejected'
      WHERE AdID = ?
    `,
        [adID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Ad not found or already moderated.");
      }

      return { success: true, message: "Ad rejected successfully." };
    } catch (error) {
      console.error("Error in rejectAd:", error);
      throw error;
    }
  }

  // Get partners for moderation
  async getPartnersForModeration() {
    try {
      const [partners] = await db.query(`
      SELECT 
        pr.PartnerID,
        pr.BusinessName,
        pr.BusinessDescription,
        pr.phone,
        per.PersonID,
        per.first_name,
        per.last_name,
        per.username,
        per.email,
        per.src
      FROM Partner pr
      JOIN Person per ON pr.PersonID = per.PersonID
      WHERE pr.status = 'Pending'
    `);

      return partners;
    } catch (error) {
      console.error("Error in getPartnersForModeration:", error);
      throw error;
    }
  }

  // Approve partner
  async approvePartner(partnerID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Partner
      SET status = 'Approved'
      WHERE PartnerID = ?
    `,
        [partnerID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Partner not found or already moderated.");
      }

      return { success: true, message: "Partner approved." };
    } catch (error) {
      console.error("Error in approvePartner:", error);
      throw error;
    }
  }

  //reject partner
  async rejectPartner(partnerID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Partner
      SET status = 'Rejected'
      WHERE PartnerID = ?
    `,
        [partnerID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Partner not found or already moderated.");
      }

      return { success: true, message: "Partner rejected." };
    } catch (error) {
      console.error("Error in rejectPartner:", error);
      throw error;
    }
  }
}

module.exports = Moderator;
