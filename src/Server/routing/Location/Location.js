const db = require("../../db");

class Location {
  #location = {
    location_id: 0,
    description: "",
    src: "",
    location_name: "",
  };

  #locationProgress = 0;

  async getLocationData(location_id, user_id) {
    const res = await db.query("select * from Location where location_id = ?", [
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

  async getLocationDataPure(location_id) {
    const res = await db.query("select * from Location where location_id = ?", [
      location_id,
    ]);
    let locationData = res[0][0];
    return locationData;
  }

  // returns the progress of the user in the location
  async #calculateLocationProgress(location_id, user_id) {
    const res = await db.query(
      "select count(*) as total from Poi where location_id = ?",
      [location_id]
    );
    const totalPois = res[0][0].total;

    const res2 = await db.query(
      `
      SELECT COUNT(*) AS visited
      FROM Visit v
      JOIN Poi p ON v.PlaceToVisit = p.POIID
      WHERE p.location_id = ? AND v.visitor = ?
    `,
      [location_id, user_id]
    );
    const visitedPois = res2[0][0].visited;

    return visitedPois / totalPois;
  }

  // returns all the POIs in the location
  async getLocationPOIs(location_id) {
    const res = await db.query("select * from Poi where location_id = ?", [
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
    FROM Location l
    LEFT JOIN Poi p ON l.location_id = p.location_id
    LEFT JOIN Visit v ON v.PlaceToVisit = p.POIID AND v.visitor = ?
    GROUP BY l.location_id
  `,
      [userId]
    );

    return res[0];
  }

  async getLocationsPure() {
    const [res] = await db.query("SELECT * FROM Location");
    return res;
  }
}

module.exports = Location;
