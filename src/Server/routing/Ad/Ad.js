const db = require("../../db");

class Ad {
  // get the views, clicks of the ad
  async getAdStatistics(partner_id) {
    const [adStatistics] = await db.query(
      `SELECT 
    SUM(views) AS total_views,
    SUM(clicks) AS total_clicks,
    SUM(cost) AS total_cost,
    Count(*) AS total_ads
    FROM Ad
    WHERE uploaded_by = ?`,
      [partner_id]
    );

    return adStatistics[0];
  }

  // Create a new ad
  async createAd(partnerId, adData) {
    const { title, Description, end_date, cost, PoiID } = adData;

    try {
      const [result] = await db.query(
        `
      INSERT INTO Ad (
        uploaded_by,
        title,
        Description,
        end_date,
        cost,
        PoiID
      ) VALUES (?, ?, ?, ?, ?, ?)
      `,
        [partnerId, title, Description || null, end_date, cost, PoiID]
      );

      return {
        success: true,
        adId: result.insertId,
        message: "Ad created successfully and is pending approval.",
      };
    } catch (error) {
      console.error("Error in createAd:", error);
      throw error;
    }
  }

  async editAd(ad_id, partnerId, adData) {
    const { title, Description, end_date, cost } = adData;

    try {
      const [result] = await db.query(
        `
      UPDATE Ad
      SET 
        title = ?,
        Description = ?,
        end_date = ?,
        cost = ?
      WHERE AdID = ? and uploaded_by = ?
      `,
        [title, Description, end_date, cost, ad_id, partnerId]
      );

      if (result.affectedRows === 0) {
        return {
          success: false,
          message: "No ad found to update or permission denied.",
        };
      }

      return {
        success: true,
        message: "Ad updated successfully.",
      };
    } catch (error) {
      console.error("Error in editAd:", error);
      throw error;
    }
  }

  // For changint the ad budget
  async changeAdBudget(partner_id, ad_id, new_budget) {
    if (new_budget <= 0) {
      return { success: false, message: "Budget must be greater than zero" };
    }

    try {
      // Step 1: Get current ad cost
      const [adRows] = await db.query(
        `SELECT cost FROM Ad WHERE AdID = ? AND uploaded_by = ? LIMIT 1`,
        [ad_id, partner_id]
      );

      if (adRows.length === 0) {
        return {
          success: false,
          message: "Ad not found or not owned by this partner",
        };
      }

      const currentCost = adRows[0].cost;
      const difference = new_budget - currentCost;

      // Step 2: Get personId for this partner
      const [personRows] = await db.query(
        `SELECT PersonID FROM Partner WHERE PartnerID = ? LIMIT 1`,
        [partner_id]
      );

      if (personRows.length === 0) {
        return { success: false, message: "Partner not found" };
      }

      const personId = personRows[0].PersonID;

      // Step 3: If increasing the budget, charge the difference
      if (difference > 0) {
        const chargeResult = await this.chargeFunds(personId, difference);
        if (!chargeResult.success) {
          return {
            success: false,
            message: "Insufficient funds to increase budget",
          };
        }
      }

      // Step 4: If decreasing the budget, refund the difference
      if (difference < 0) {
        await this.addFunds(personId, Math.abs(difference));
      }

      // Step 5: Update the ad's budget
      await db.query(`UPDATE Ad SET cost = ? WHERE AdID = ?`, [
        new_budget,
        ad_id,
      ]);

      return {
        success: true,
        message: `Ad budget updated successfully. New budget: ${new_budget}`,
      };
    } catch (error) {
      console.error("Error in changeAdBudget:", error);
      throw error;
    }
  }

  async getAdData(ad_id) {
    try {
      const [rows] = await db.query(
        `
      SELECT
          a.AdID,
          a.title,
          a.Description,
          a.start_date,
          a.end_date,
          a.views,
          a.clicks,
          a.status,
          a.cost,
          p.POI_name AS point_of_interest,
          l.location_name AS location
      FROM 
          Ad a
      JOIN 
          Poi p ON a.PoiID = p.POIID
      JOIN 
          Location l ON p.location_id = l.location_id
      WHERE 
          a.AdID = ?
      ORDER BY 
          a.start_date DESC;
      `,
        [ad_id]
      );

      if (rows.length === 0) {
        return null; // No ad found with that ID
      }

      return rows[0];
    } catch (error) {
      console.error("Error in getAdData:", error);
      throw error;
    }
  }

  // get the ads of the business (expired ones too)
  async getAds(partner_id) {
    const [adData] = await db.query(
      `SELECT
    a.AdID,
    a.title,
    a.Description,
    a.start_date,
    a.end_date,
    a.views,
    a.clicks,
    a.status,
    a.cost,
    p.POI_name AS point_of_interest,
    l.location_name AS location
FROM 
    Ad a
JOIN 
    Poi p ON a.PoiID = p.POIID
JOIN 
    Location l ON p.location_id = l.location_id
WHERE 
    a.uploaded_by = ?
ORDER BY 
    a.start_date DESC;`,
      [partner_id]
    );
    return adData;
  }

  // get the ads of the POI
  async getAdsforPoi(poi_id) {
    try {
      const [rows] = await db.query(
        `
      SELECT 
        a.*,
        p.BusinessName,
        p.BusinessDescription,
        p.phone,
        pe.src
      FROM Ad a
      JOIN Partner p ON a.uploaded_by = p.PartnerID
      JOIN Person pe on p.PersonID = pe.PersonID
      WHERE a.PoiID = ?
        AND a.status = 'Approved'
        AND a.end_date >= CURRENT_DATE
      ORDER BY a.start_date DESC
      `,
        [poi_id]
      );

      return rows;
    } catch (error) {
      console.error("Error in getAdsforPoi:", error);
      throw error;
    }
  }

  async deleteAd(ad_id) {
    try {
      const [result] = await db.query(
        `
      DELETE FROM Ad
      WHERE AdID = ?
      `,
        [ad_id]
      );

      return { success: result.affectedRows > 0 };
    } catch (error) {
      console.error("Error in deleteAd:", error);
      throw error;
    }
  }

  // increases the view count
  async #addAdView(ad_id) {
    console.log("addAdView called with ad_id:", ad_id);
    try {
      const [result] = await db.query(
        `
      UPDATE Ad
      SET views = views + 1
      WHERE AdID = ?
      `,
        [ad_id]
      );

      return { success: result.affectedRows > 0 };
    } catch (error) {
      console.error("Error in addAdView:", error);
      throw error;
    }
  }

  //increase the click count
  async #addAdClick(ad_id) {
    console.log("addAdClick called with ad_id:", ad_id);
    try {
      const [result] = await db.query(
        `
      UPDATE Ad
      SET clicks = clicks + 1
      WHERE AdID = ?
      `,
        [ad_id]
      );

      return { success: result.affectedRows > 0 };
    } catch (error) {
      console.error("Error in addAdClick:", error);
      throw error;
    }
  }

  // Handle ad events for analytics tracking
  updateAdData(ad_id, event) {
    if (event == "view") {
      return this.#addAdView(ad_id);
    } else if (event == "click") {
      return this.#addAdClick(ad_id);
    } else {
      console.error("Unknown event type:", event);
    }
  }

  // get pending ads for viewing by the moderator
  async getAllPendingAds() {
    try {
      const [ads] = await db.query(
        `SELECT 
          AdID, 
          title, 
          Description, 
          start_date, 
          end_date, 
          cost, 
          status 
        FROM Ad 
        WHERE status = 'Pending' 
        ORDER BY start_date DESC`
      );
      return ads;
    } catch (error) {
      console.error("Error fetching pending advertisements:", error);
      throw error;
    }
  }

  // Update advertisement status (Accept or Reject)
  async updateAdStatus(ad_id, status) {
    try {
      const [result] = await db.query(
        `UPDATE Ad SET status = ? WHERE AdID = ?`,
        [status, ad_id]
      );

      if (result.affectedRows > 0) {
        return { success: true };
      } else {
        return { success: false, message: "Advertisement not found" };
      }
    } catch (error) {
      console.error("Error updating advertisement status:", error);
      throw error;
    }
  }
}

module.exports = Ad;
