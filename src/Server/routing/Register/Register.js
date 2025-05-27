/*
 * This Class is responsible for the Registration of moderators, users and Businesses.
 */

const db = require("../../db");
const bcrypt = require("bcryptjs");

class Register {
  async #createPerson(formData, role) {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      src,
      phone,
      BusinessName,
      BusinessDescription,
    } = formData;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        "insert into Person (username, first_name, last_name, email, src, password, role) values (?, ?, ?, ?, ?, ?, ?)",
        [username, first_name, last_name, email, src, hashedPassword, role]
      );
      const [response] = await db.query(
        "select PersonID from Person where email = ?",
        [email]
      );
      const PersonID = response[0].PersonID;

      switch (role) {
        case "USER":
          this.#createUser(PersonID);
          break;
        case "PARTNER":
          this.#createPartner(
            PersonID,
            phone,
            BusinessName,
            BusinessDescription
          );
          break;
        case "MODERATOR":
          this.#createModerator(PersonID);
          break;
        default:
          throw new Error("Invalid role");
      }

      return PersonID;
    } catch (error) {
      console.error("Error creating person:", error);
      throw error;
    }
  }
  async #createUser(PersonID) {
    try {
      await db.query("insert into User (PersonID) values (?)", [PersonID]);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async #createPartner(PersonID, phone, BusinessName, BusinessDescription) {
    try {
      db.query(
        "insert into Partner (PersonID, phone, BusinessName, BusinessDescription) values (?, ?, ?,?)",
        [PersonID, phone, BusinessName, BusinessDescription]
      );
    } catch (error) {
      console.error("Error creating business:", error);
      throw error;
    }
  }

  async #createModerator(PersonID) {
    try {
      await db.query("insert into Moderator (PersonID) values (?)", [PersonID]);
    } catch (error) {
      console.error("Error creating moderator:", error);
      throw error;
    }
  }

  async #checkIfPersonExists(email) {
    const [response] = await db.query("select * from Person where email = ?", [
      email,
    ]);
    return response.length > 0;
  }

  async registerUser(formData, role) {
    if (!formData) {
      throw new Error("Form data is required");
    }

    if (await this.#checkIfPersonExists(formData.email)) {
      console.log("User already exists");
      return false;
    } else {
      await this.#createPerson(formData, role);
      return true;
    }
  }
}

module.exports = Register;
