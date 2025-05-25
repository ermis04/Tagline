const db = require("../../db");
const User = require("../User/User");

class Poi {
  // Mark the POI as not visited
  async unmarkPoiAsVisitedByUser(poi_id, user_id) {
    const [results] = await db.query(
      "delete from visit where PlaceToVisit = ? and visitor = ?",
      [poi_id, user_id]
    );

    console.log("Results: ", results);
    if (results.affectedRows > 0) {
      const user = new User();
      const [[poiData]] = await db.query(
        "SELECT points FROM poi WHERE poiid = ?",
        [poi_id]
      );
      const points_to_remove = poiData.points;

      user.removePoints(points_to_remove, user_id);
    }
  }

  // Mark the POI as visited by the user
  async markPoiAsVisitedByUser(poi_id, user_id) {
    const [results] = await db.query(
      "insert into visit (visitor, PlaceToVisit) values (?, ?)",
      [user_id, poi_id]
    );

    if (results.affectedRows > 0) {
      const user = new User();
      const [[poiData]] = await db.query(
        "SELECT points FROM poi WHERE poiid = ?",
        [poi_id]
      );
      const points_to_add = poiData.points;

      user.addPoints(points_to_add, user_id);
    }
  }

  noOfPoisVisitedByUser(user_id, location_id) {
    return db.query(
      "select count(*) as noOfPoisVisited from visit where visitor = ?",
      [user_id]
    );
  }

  // returns all the data related to POI
  async getPoiData(poi_id) {
    const res = await db.query("select * from poi where poiid = ?", [poi_id]);
    return res[0][0];
  }
}

module.exports = Poi;
