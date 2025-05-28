function storeFirstPageData() {
  const formData = {
    first_name: document.getElementById("name").value,
    last_name: document.getElementById("surname").value,
    BusinessName: document.getElementById("businessname").value,
    username: document.getElementById("username").value,
  };
  sessionStorage.setItem("signupData", JSON.stringify(formData));
}

function submitAllData() {
  console.log("submitting");
  // Get data from first page
  const firstPageData = JSON.parse(sessionStorage.getItem("signupData")) || {};

  // Get data from second page
  const secondPageData = {
    BusinessDescription: document.getElementById("BusinessDescription").value,
    src: "https://images.unsplash.com/photo-1628563694622-5a76957fd09c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D", // or handle file upload
    email: document.getElementById("email").value,
    phone: document.getElementById("Phone").value,
    password: document.getElementById("password").value,
  };
  const completeData = { ...firstPageData, ...secondPageData };

  // Submit to server
  fetch("/register/partner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completeData),
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          throw new Error("User with this email already exists");
        } else {
          throw new Error(data.message || "Registration failed");
        }
      }

      sessionStorage.removeItem("signupData");
      window.location.href = "/logIn";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signupForm2")
    .addEventListener("submit", function (event) {
      console.log("Form submitted");
      event.preventDefault();

      submitAllData();
    });
});
