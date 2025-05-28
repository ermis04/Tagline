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
      // Parse cookies to find 'user_type'
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split("=");
        acc[name] = value;
        return acc;
      }, {});

      const userType = cookies["user_type"];

      if (userType === "USER") {
        window.location.href = "/user";
      } else if (userType === "MODERATOR") {
        window.location.href = "/moderator";
      } else if (userType === "PARTNER") {
        window.location.href = "/partner";
      } else {
        console.warn("user_type cookie not found");
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login");
  }
});
