const db = require("../../db");

class Location {
  async getLocationData(location_id) {
    const res = await db.query("select * from location where location_id = ?", [
      location_id,
    ]);
    return res[0][0];
  }

  // returns the progress of the user in the location
  #calculateLocationProgress(location_id, user_id) {
    const totalPois = db.query(
      "select count(*) as total from poi where location_id = ?",
      [location_id]
    );

    const visitedPois = db.query(
      "select count(*) as visited from visit where PlaceToVisit = ? and visitor = ?",
      [location_id, user_id]
    );
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
