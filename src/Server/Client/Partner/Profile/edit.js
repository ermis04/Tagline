fetch("/partner/data", {
  method: "GET",
  credentials: "include",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log("Profile data:", data);
    document.getElementById("profile-pic").src = data.src;
    document.getElementById("BusinessName").value = data.BusinessName;
    document.getElementById("BusinessDescription").value =
      data.BusinessDescription;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("username-info").value = data.username;
    document.getElementById("src").value = data.src;
    document.getElementById("first_name").value = data.first_name;
    document.getElementById("last_name").value = data.last_name;
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
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
      BusinessName: document.getElementById("BusinessName").value.trim(),
      BusinessDescription: document
        .getElementById("BusinessDescription")
        .value.trim(),
      username: document.getElementById("username-info").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      src: document.getElementById("src").value.trim(),
      first_name: document.getElementById("first_name").value.trim(),
      last_name: document.getElementById("last_name").value.trim(),
    };

    fetch("/partner/update", {
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
