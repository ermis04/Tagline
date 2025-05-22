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
  async getLocations() {
    const res = await db.query("select * from location");
    return res[0];
  }
}

module.exports = Location;
