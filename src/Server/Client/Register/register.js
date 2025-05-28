function storeFirstPageData() {
  const formData = {
    first_name: document.getElementById("name").value,
    last_name: document.getElementById("surname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  sessionStorage.setItem("signupData", JSON.stringify(formData));
}

function submitAllData() {
  console.log("submitting");
  // Get data from first page
  const firstPageData = JSON.parse(sessionStorage.getItem("signupData")) || {};

  // Get data from second page
  const secondPageData = {
    username: document.getElementById("username").value,
    src: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
  };
  const completeData = { ...firstPageData, ...secondPageData };

  // Submit to server
  fetch("/register/user", {
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
