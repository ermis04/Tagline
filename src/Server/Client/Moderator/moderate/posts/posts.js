window.onload = function () {
  fetch("/moderator/contentForModeration")
    .then((res) => res.json())
    .then((data) => {
      const posts = data.posts || [];
      console.log("Fetched posts:", posts); // Debugging log
      const container = document.getElementById("pending-posts");
      container.innerHTML = ""; // Clear the container

      posts.forEach((post) => {
        console.log("Rendering post:", post); // Debugging log
        const postDiv = document.createElement("div");
        postDiv.className = "post-card";

      postDiv.innerHTML = `
        <div class="post-content">
          <div class="post-text">
            <strong>Caption:</strong> ${post.caption || "No caption provided"}<br>
            <span>Uploaded By: ${post.username}</span><br>
            <span>Upload Date: ${new Date(post.uploadDate).toLocaleString()}</span><br>
            <span>Likes: ${post.like_count}</span><br><br>
            <button onclick="approvePost(${post.PostID})">Approve Post</button>
            <button onclick="rejectPost(${post.PostID})">Reject Post</button>
          </div>
          <div class="post-image">
            <img src="${post.postSrc.startsWith('http') ? post.postSrc : `http://localhost:3000/${post.postSrc}`}" alt="Post Image" />
          </div>
        </div>
        <hr>
      `;

        container.appendChild(postDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
};

window.approvePost = function (postId) {
  fetch(`/posts/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post_id: postId }),
  })
    .then((res) => res.json())
    .then((result) => {
      alert(result.message);
      window.onload(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error approving post:", error);
    });
};

window.rejectPost = function (postId) {
  fetch(`/posts/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post_id: postId }),
  })
    .then((res) => res.json())
    .then((result) => {
      alert(result.message);
      window.onload(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error rejecting post:", error);
    });
};