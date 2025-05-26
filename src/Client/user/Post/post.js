
const urlParams = new URLSearchParams(window.location.search);
const post_id = urlParams.get("post_id");

   fetch("/posts/data?post_id=" + post_id, {
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
    document.getElementById("username").textContent = `${data.username}`;
    document.getElementById("profile-pic").src =
      data.userSrc || "/images/defaulprofile.png";
    document.getElementById("place").textContent =
      data.POI_name;
    document.getElementById("poi-photo").src = data.poisrc || "/images/defaulprofile.png";
    document.getElementById("commentNum").textContent = data.comments.length;
    document.getElementById("likes").textContent = data.like_count;

  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });
