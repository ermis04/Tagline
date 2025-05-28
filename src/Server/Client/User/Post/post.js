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
    // console.error(data);
    if (document.getElementById("username")) {
      document.getElementById("username").textContent = `${data.username}`;
    }

    if (document.getElementById("profile-pic")) {
      document.getElementById("profile-pic").src = data.userSrc;
    }

    if (document.getElementById("place")) {
      document.getElementById("place").textContent = data.POI_name;
    }

    if (document.getElementById("poi-photo")) {
      document.getElementById("poi-photo").src = data.postSrc;
    }

    if (document.getElementById("commentNum")) {
      document.getElementById("commentNum").textContent = data.comments.length;
    }

    if (document.getElementById("likes")) {
      document.getElementById("likes").textContent = data.like_count;
    }

    if (document.getElementById("post-text")) {
      document.getElementById("post-text").textContent = data.post_text;
    }

    const profileLink = document.getElementById("profile-link");
    const placeLink = document.getElementById("place-link");

    if (profileLink) {
      profileLink.addEventListener("click", function (event) {
        event.preventDefault(); // Optional: if you want to prevent default behavior
        profileLink.href = "user/profile?user_id=" + data.PersonID;
        window.location.href = profileLink.href;
      });
    }

    if (placeLink) {
      placeLink.addEventListener("click", function (event) {
        event.preventDefault(); // Optional
        placeLink.href = "/poi?poi_id=" + data.poiID;
        window.location.href = placeLink.href;
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("next-post-button").addEventListener("click", () => {
    window.location.href = `/posts?post_id=${Number(post_id) + 1}`;
  });

  document.getElementById("like-button").addEventListener("click", () => {
    fetch("/posts/like?post_id=" + post_id, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  document.getElementById("comment-button").addEventListener("click", () => {
    window.location.href = "/posts/comments?post_id=" + post_id;
  });
});
