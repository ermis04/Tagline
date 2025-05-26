document.addEventListener("DOMContentLoaded", function () {
  fetch("/user/profile/data", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to fetch user data");
    })
    .then((data) => {
      console.log("User data:", data);

      // Set username and profile picture
      const usernameEl = document.getElementById("username");
      if (usernameEl) usernameEl.textContent = `@${data.username}`;

      const profilePicEl = document.getElementById("profile-pic");
      if (profilePicEl)
        profilePicEl.src = data.src || "/images/defaultprofile.png";

      // Set input values
      if (document.getElementById("name"))
        document.getElementById("name").value = data.first_name || "";

      if (document.getElementById("surname"))
        document.getElementById("surname").value = data.last_name || "";

      if (document.getElementById("username-field"))
        document.getElementById("username-field").value = data.username || "";

      if (document.getElementById("email"))
        document.getElementById("email").value = data.email || "";

      if (document.getElementById("src"))
        document.getElementById("src").value = data.src || "";
    })
    .catch((error) => {
      console.error("Error fetching profile data:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("edit-profile-form");
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      first_name: document.getElementById("name").value.trim(),
      last_name: document.getElementById("surname").value.trim(),
      username: document.getElementById("username-field").value.trim(),
      email: document.getElementById("email").value.trim(),
      src: document.getElementById("src").value.trim(),
    };

    fetch("/user/profile/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update profile");
      })
      .then((data) => {
        console.log("Profile updated successfully:", data);
        // Optionally, you can redirect or show a success message
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  });
});
