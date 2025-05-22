document.getElementById("logInForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });

    if (response.ok) {
      window.location.href = "/user";
    } else {
      // Handle login error (show error message to user)
      const errorData = await response.json();
      alert(errorData.message || "Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login");
  }
});
