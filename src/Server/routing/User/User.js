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

  //for updating the user data
  async updateUserData(personID, updatedFields) {
    try {
      // Destructure only the allowed fields
      const { first_name, last_name, username, email, src } = updatedFields;

      // Build dynamic SET clause and values array
      const fieldsToUpdate = [];
      const values = [];

      if (first_name !== undefined) {
        fieldsToUpdate.push("first_name = ?");
        values.push(first_name);
      }
      if (last_name !== undefined) {
        fieldsToUpdate.push("last_name = ?");
        values.push(last_name);
      }
      if (username !== undefined) {
        fieldsToUpdate.push("username = ?");
        values.push(username);
      }
      if (email !== undefined) {
        fieldsToUpdate.push("email = ?");
        values.push(email);
      }
      if (src !== undefined) {
        fieldsToUpdate.push("src = ?");
        values.push(src);
      }

      // If no fields are being updated
      if (fieldsToUpdate.length === 0) {
        throw new Error("No valid fields provided for update.");
      }

      values.push(personID); // Add ID for WHERE clause

      const [result] = await db.query(
        `
      UPDATE Person
      SET ${fieldsToUpdate.join(", ")}
      WHERE PersonID = ?
    `,
        values
      );

      if (result.affectedRows === 0) {
        throw new Error("User not found or nothing was updated.");
      }

      return { success: true, message: "User info updated successfully." };
    } catch (error) {
      console.error("Error in updateUserData:", error);
      throw error;
    }
  }
  // for getting the friends of the user
  async getFriends(userID) {
    console.log("UserID: ", userID);
    try {
      const [friends] = await db.query(
        `
      SELECT 
        f.FriendshipID,
        u.UserID AS friendUserID,
        p.PersonID,
        p.first_name,
        p.last_name,
        p.username,
        p.email,
        p.src,
        u.points_collected
      FROM Friends f
      JOIN User u ON u.UserID = 
        CASE 
          WHEN f.User1ID = ? THEN f.User2ID
          ELSE f.User1ID
        END
      JOIN Person p ON u.PersonID = p.PersonID
      WHERE (f.User1ID = ? OR f.User2ID = ?) AND f.Status = 'Accepted'
    `,
        [userID, userID, userID]
      );

      return friends;
    } catch (error) {
      console.error("Error in getFriends:", error);
      throw error;
    }
  }

  // x user is friend, done from social page
  async addFriend(userID1, userID2) {
    try {
      if (userID1 === userID2) {
        throw new Error("You cannot add yourself as a friend.");
      }

      // Order IDs to match CHECK constraint (User1ID < User2ID)
      const [User1ID, User2ID] =
        userID1 < userID2 ? [userID1, userID2] : [userID2, userID1];

      // Check if friendship already exists
      const [existing] = await db.query(
        `
      SELECT * FROM Friends
      WHERE User1ID = ? AND User2ID = ?
    `,
        [User1ID, User2ID]
      );

      // Insert new friend
      await db.query(
        `
      INSERT INTO Friends (User1ID, User2ID, Status)
      VALUES (?, ?, 'Accepted')
    `,
        [User1ID, User2ID]
      );

      return { success: true, message: "Friend request sent." };
    } catch (error) {
      console.error("Error in addFriend:", error);
      throw error;
    }
  }

  async removeFriend(userID1, userID2) {
    try {
      if (userID1 === userID2) {
        throw new Error("Invalid operation: cannot remove yourself.");
      }

      // Ensure correct order for constraint
      const [User1ID, User2ID] =
        userID1 < userID2 ? [userID1, userID2] : [userID2, userID1];

      // Attempt to delete the friendship
      const [result] = await db.query(
        `
      DELETE FROM Friends
      WHERE User1ID = ? AND User2ID = ?
    `,
        [User1ID, User2ID]
      );

      if (result.affectedRows === 0) {
        return {
          success: false,
          message: "Friendship not found.",
        };
      }

      return {
        success: true,
        message: "Friend removed successfully.",
      };
    } catch (error) {
      console.error("Error in removeFriend:", error);
      throw error;
    }
  }

  async getLeaderboard(userID) {
    try {
      // Step 1: Get friend UserIDs (based on bidirectional friendships)
      const [friendRows] = await db.query(
        `
      SELECT 
        CASE 
          WHEN f.User1ID = ? THEN f.User2ID
          ELSE f.User1ID
        END AS friendID
      FROM Friends f
      WHERE (f.User1ID = ? OR f.User2ID = ?) AND f.Status = 'Accepted'
    `,
        [userID, userID, userID]
      );

      if (friendRows.length === 0) return [];

      // Step 2: Extract friend IDs + include self if desired
      const friendIDs = friendRows.map((row) => row.friendID);
      friendIDs.push(userID); // Include current user in leaderboard (optional)

      // Step 3: Fetch user info and points for those friends
      const [rows] = await db.query(
        `
      SELECT 
        p.username,
        p.src AS profileImage,
        u.points_collected,
        u.UserID
      FROM User u
      JOIN Person p ON u.PersonID = p.PersonID
      WHERE u.UserID IN (?)
      ORDER BY u.points_collected DESC
    `,
        [friendIDs]
      );

      return rows;
    } catch (error) {
      console.error("Error in getLeaderboard:", error);
      throw error;
    }
  }
}

module.exports = User;
