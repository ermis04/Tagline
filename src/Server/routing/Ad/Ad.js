const db = require("../../db");

class Ad {
  createAd() {} // Create ad
  changeAdBudget() {} // Edit ad


  // get the views, clicks of the ad
  async getAdStatistics(partner_id) {
    const [adStatistics] = await db.query(
    `SELECT 
    SUM(views) AS total_views,
    SUM(clicks) AS total_clicks
    FROM ad
    WHERE uploaded_by = ?`
    ,[partner_id]
    )

    return adStatistics;
  } 
  getAdData() {} // get the data of the ad

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
    ad a
JOIN 
    POI p ON a.PoiID = p.POIID
JOIN 
    location l ON p.location_id = l.location_id
WHERE 
    a.uploaded_by = ?
ORDER BY 
    a.start_date DESC;`,
      [partner_id]
    );
    return adData[0];
  }

  // get the ads of the POI
  getAdsforPoi(poi_id) {
    const res = db.query("select * from ad where PoiID = ?", [poi_id]);
    return res[0];
  }

  // add view to the ad
  #addAdView(ad_id) {

  } 

  // add click to the ad
  #addAdClick() {

  } 

  updateAdData() {} //update views and click count
}

module.exports = Ad;
