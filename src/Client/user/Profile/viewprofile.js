fetch("/user/profile/data", {
  method: "GET",
  credentials: "include",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log(data);
    document.getElementById("username").textContent = `@${data.username}`;
    document.getElementById("profile-pic").src =
      data.src || "/images/defaulprofile.png";
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });
