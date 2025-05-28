const db = require("../../db");
const User = require("../User/User");

class Poi {
  #poi = {
    poiid: null,
    POI_name: "",
    POI_description: "",
    points: 0,
    src: null,
    location_id: null,
  };
  // Mark the POI as not visited
  async unmarkPoiAsVisitedByUser(poi_id, user_id) {
    const [results] = await db.query(
      "delete from Visit where PlaceToVisit = ? and visitor = ?",
      [poi_id, user_id]
    );

    console.log("Results: ", results);
    if (results.affectedRows > 0) {
      const user = new User();
      const [[poiData]] = await db.query(
        "SELECT points FROM Poi WHERE poiid = ?",
        [poi_id]
      );
      const points_to_remove = poiData.points;

      user.removePoints(points_to_remove, user_id);
    }
  }

  // Mark the POI as visited by the user
  async markPoiAsVisitedByUser(poi_id, user_id) {
    const [results] = await db.query(
      "insert into Visit (visitor, PlaceToVisit) values (?, ?)",
      [user_id, poi_id]
    );

    if (results.affectedRows > 0) {
      const user = new User();
      const [[poiData]] = await db.query(
        "SELECT points FROM Poi WHERE poiid = ?",
        [poi_id]
      );
      const points_to_add = poiData.points;

      user.addPoints(points_to_add, user_id);
    }
  }

  // returns all the data related to POI
  async getPoiData(poi_id, user_id) {
    const res = await db.query(
      `
    SELECT 
      p.*, 
      CASE WHEN v.visitor IS NOT NULL THEN TRUE ELSE FALSE END AS visited
    FROM Poi p
    LEFT JOIN Visit v ON v.PlaceToVisit = p.POIID AND v.visitor = ?
    WHERE p.POIID = ?
  `,
      [user_id, poi_id]
    );
    return res[0][0];
  }
}

module.exports = Poi;
