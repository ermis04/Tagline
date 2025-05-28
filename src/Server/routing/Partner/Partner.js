const db = require("../../db"); // Import the database connection

class Partner {
  #partner = {
    BusinessName: "",
    Balance: 0,
    src: "",
    Description: "",
    phone: 0,
    POI_description: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
  };
  // Get partner data
  async getPartnerData(personId) {
    console.log("getPartnerData called with personId:", personId);
    try {
      const [rows] = await db.query(
        `
      SELECT 
        pr.PartnerID,
        p.PersonID,
        p.username,
        p.first_name,
        p.last_name,
        p.email,
        p.src,
        p.Role,
        pr.BusinessName,
        pr.Balance,
        pr.phone,
        pr.BusinessDescription,
        pr.status
      FROM Person p
      JOIN Partner pr ON p.PersonID = pr.PersonID
      WHERE p.PersonID = ?
      LIMIT 1
      `,
        [personId]
      );

      if (rows.length === 0) {
        return null; // No partner found with this ID
      }

      return rows[0];
    } catch (error) {
      console.error("Error in getPartnerData:", error);
      throw error;
    }
  }

  // Check balance
  async checkBalance(personId) {
    try {
      const [rows] = await db.query(
        `
      SELECT 
        pr.Balance
      FROM Partner pr
      JOIN Person p ON pr.PersonID = p.PersonID
      WHERE p.PersonID = ?
      LIMIT 1
      `,
        [personId]
      );

      if (rows.length === 0) {
        return null; // No partner found with this personId
      }

      return rows[0].Balance;
    } catch (error) {
      console.error("Error in checkBalance:", error);
      throw error;
    }
  }

  // Add funds to the partner's balance
  async addFunds(personId, amount) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    try {
      // Update the balance
      const [result] = await db.query(
        `
      UPDATE Partner
      SET Balance = Balance + ?
      WHERE PersonID = ?
      `,
        [amount, personId]
      );

      if (result.affectedRows === 0) {
        return { success: false, message: "Partner not found" };
      }

      return { success: true, message: `Added ${amount} to balance.` };
    } catch (error) {
      console.error("Error in addFunds:", error);
      throw error;
    }
  }

  //cjarge funds from the partner's balance
  async chargeFunds(personId, amount) {
    console.log(
      `chargeFunds called with personId: ${personId}, amount: ${amount}`
    );

    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    try {
      // First, get the current balance
      const [rows] = await db.query(
        `SELECT Balance FROM Partner WHERE PersonID = ? LIMIT 1`,
        [personId]
      );

      if (rows.length === 0) {
        return { success: false, message: "Partner not found" };
      }

      const currentBalance = rows[0].Balance;

      if (currentBalance < amount) {
        return { success: false, message: "Insufficient funds" };
      }

      // Deduct the amount
      const [result] = await db.query(
        `UPDATE Partner SET Balance = Balance - ? WHERE PersonID = ?`,
        [amount, personId]
      );

      return { success: true, message: `Charged ${amount} from balance.` };
    } catch (error) {
      console.error("Error in chargeFunds:", error);
      throw error;
    }
  }

  // Update partner data
  async updatePartnerData(personId, formData) {
    try {
      const {
        BusinessName,
        phone,
        BusinessDescription,
        src,
        email,
        username,
        first_name,
        last_name,
      } = formData;

      // Step 1: Get current data
      const [currentRows] = await db.query(
        `
      SELECT 
        pr.BusinessName, pr.phone, pr.BusinessDescription,
        p.src, p.email, p.username, p.first_name, p.last_name
      FROM Partner pr
      JOIN Person p ON pr.PersonID = p.PersonID
      WHERE pr.PersonID = ?
      LIMIT 1
      `,
        [personId]
      );

      if (currentRows.length === 0) {
        return { success: false, message: "Partner not found" };
      }

      const current = currentRows[0];

      // Step 2: Build dynamic update queries
      const partnerUpdates = [];
      const partnerValues = [];

      if (BusinessName && BusinessName !== current.BusinessName) {
        partnerUpdates.push("BusinessName = ?");
        partnerValues.push(BusinessName);
      }

      if (phone && phone !== current.phone) {
        partnerUpdates.push("phone = ?");
        partnerValues.push(phone);
      }

      if (
        BusinessDescription &&
        BusinessDescription !== current.BusinessDescription
      ) {
        partnerUpdates.push("BusinessDescription = ?");
        partnerValues.push(BusinessDescription);
      }

      const personUpdates = [];
      const personValues = [];

      if (src && src !== current.src) {
        personUpdates.push("src = ?");
        personValues.push(src);
      }

      if (email && email !== current.email) {
        personUpdates.push("email = ?");
        personValues.push(email);
      }

      if (username && username !== current.username) {
        personUpdates.push("username = ?");
        personValues.push(username);
      }

      if (first_name && first_name !== current.first_name) {
        personUpdates.push("first_name = ?");
        personValues.push(first_name);
      }

      if (last_name && last_name !== current.last_name) {
        personUpdates.push("last_name = ?");
        personValues.push(last_name);
      }

      // Step 3: Execute updates
      if (partnerUpdates.length > 0) {
        await db.query(
          `UPDATE Partner SET ${partnerUpdates.join(", ")} WHERE PersonID = ?`,
          [...partnerValues, personId]
        );
      }

      if (personUpdates.length > 0) {
        await db.query(
          `UPDATE Person SET ${personUpdates.join(", ")} WHERE PersonID = ?`,
          [...personValues, personId]
        );
      }

      return { success: true, message: "Only changed fields were updated" };
    } catch (error) {
      console.error("Error in updatePartnerData:", error);
      throw error;
    }
  }
}

module.exports = Partner;
