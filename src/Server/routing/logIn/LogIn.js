/*
 * This is for the LogIn class.
 */

const db = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class LogIn {
  async #getCreds(email) {
    const [response] = await db.query(
      "select password, email, PersonID, role from Person where email = ?",
      [email]
    );
    return response[0];
  }

  async #getPerson(email) {
    const [response] = await db.query(
      "select * from Person inner join user on Person.PersonID = user.PersonID where email = ?;",
      [email]
    );
    return response[0];
  }

  // takes an email and password, and checks if the user exists in the db.
  // if the user exists and the password is correct, generates an auth token as a cookie.
  async logIn(email, password) {
    try {
      const person = await this.#getCreds(email);

      if (!person) {
        console.log("No user found with that email");
        return undefined;
      }

      const validPass = await bcrypt.compare(password, person.password);
      if (!validPass) {
        console.log("Invalid password");
        return undefined;
      }

      const token = jwt.sign(
        { PersonID: person.PersonID, email: person.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      console.log(person);
      return { token, role: person.role };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getLoggedInPersonId(token) {
    try {
      if (!token) {
        throw new Error("No token provided");
      }
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return decoded.PersonID;
    } catch (error) {
      console.error("Token verification failed:", error.message);
      throw error;
    }
  }
}

module.exports = LogIn;
