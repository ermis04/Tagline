/*
 * This class will handle connections with DB and other interactions regarding a user
 */

const db = require("../../db");

class User {
  // Adds points to user
  addPoints(points_to_add, user_id) {
    return db.query(
      "UPDATE user SET points_collected = points_collected + ? WHERE UserID = ?",
      [points_to_add, user_id]
    );
  }
  removePoints(points_to_remove, user_id) {
    return db.query(
      "UPDATE user SET points_collected = points_collected - ? WHERE UserID = ?",
      [points_to_remove, user_id]
    );
  }

  // Personal info, points, Visited?
  async getUserData(personID) {
    const query =
      "SELECT p.*, u.* FROM Person p INNER JOIN `User` u ON p.PersonID = u.PersonID WHERE p.PersonID = ?";
    const [rows] = await db.query(query, [personID]);

    return rows[0];
  }

  updateUserData() {} // Update personal info from login page.
  getFriends() {} // for getting the friends of the user
  addFriend() {} // x user is friend, done from social page
  removeFriend() {} // remove friend, again from social page
  getLeaderboard() {} // calculated with points
}

module.exports = User;
