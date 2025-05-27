const db = require("../../db");

class Location {
  async getLocationData(location_id, user_id) {
    const res = await db.query("select * from location where location_id = ?", [
      location_id,
    ]);
    let locationData = res[0][0];
    const progress = await this.#calculateLocationProgress(
      location_id,
      user_id
    );
    locationData = { ...locationData, progress };
    return locationData;
  }

  // returns the progress of the user in the location
  async #calculateLocationProgress(location_id, user_id) {
    const res = await db.query(
      "select count(*) as total from poi where location_id = ?",
      [location_id]
    );
    const totalPois = res[0][0].total;

    const res2 = await db.query(
      `
      SELECT COUNT(*) AS visited
      FROM visit v
      JOIN POI p ON v.PlaceToVisit = p.POIID
      WHERE p.location_id = ? AND v.visitor = ?
    `,
      [location_id, user_id]
    );
    const visitedPois = res2[0][0].visited;

    return visitedPois / totalPois;
  }

  // returns all the POIs in the location
  async getLocationPOIs(location_id) {
    const res = await db.query("select * from poi where location_id = ?", [
      location_id,
    ]);
    return res[0];
  }

  // returns all the locations from the db
  async getLocations(userId) {
    const res = await db.query(
      `
    SELECT 
      l.*, 
      COUNT(DISTINCT p.POIID) AS poi_count,
      COUNT(DISTINCT v.PlaceToVisit) AS visited_count
    FROM location l
    LEFT JOIN POI p ON l.location_id = p.location_id
    LEFT JOIN Visit v ON v.PlaceToVisit = p.POIID AND v.visitor = ?
    GROUP BY l.location_id
  `,
      [userId]
    );

    return res[0];
  }

  async getLocations() {
    const [res] = await db.query("SELECT * FROM location");
    return res;
  }
}

module.exports = Location;
