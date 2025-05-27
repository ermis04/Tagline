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
    document.getElementById("BusinessName").textContent = data.BusinessName;
    document.getElementById("BusinessDescription").textContent =
      data.BusinessDescription;
    document.getElementById("email").textContent = data.email;
    document.getElementById("phone").textContent = data.phone;
    document.getElementById("username-info").textContent = data.username;
    document.getElementById("first_name").textContent = data.first_name;
    document.getElementById("last_name").textContent = data.last_name;
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });
