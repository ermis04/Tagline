const db = require("../../db");

class Ad {
  createAd() {} // Create ad
  changeAdBudget() {} // Edit ad
  getAdStatistics() {} // get the views, clicks of the ad
  getAdData() {} // get the data of the ad
  getAds() {} // get the ads of the business (expired ones too)

  // get the ads of the POI
  getAdsforPoi(poi_id) {
    const res = db.query("select * from ad where PoiID = ?", [poi_id]);
    return res[0];
  }

  #addAdView() {} // add view to the ad
  #addAdClick() {} // add click to the ad
  updateAdData() {} //update views and click count
}

module.exports = Ad;
