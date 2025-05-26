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
    document.getElementById("profile-pic").src = data.userSrc;
    document.getElementById("place").textContent = data.POI_name;
    document.getElementById("poi-photo").src = data.postSrc;
    document.getElementById("commentNum").textContent = data.comments.length;
    document.getElementById("likes").textContent = data.like_count;
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("next-post-button").addEventListener("click", () => {
    console.log("nigga");
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
