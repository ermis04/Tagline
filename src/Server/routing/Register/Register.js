/*
 * This Class is responsible for the Registration of moderators, users and Businesses.
 */
class Register {
  async #createPerson() {}
  async #createUser() {}

  registerUser(formData) {
    const { username, first_name, last_name, email, password, phone, src } =
      formData;

    if (!formData) {
      throw new Error("Form data is required");
    }
    console.log(formData);

    return undefined;
  }
}

module.exports = Register;
