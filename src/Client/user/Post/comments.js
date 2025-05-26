const urlParams = new URLSearchParams(window.location.search);
const post_id = urlParams.get("post_id");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("back-button").href = `/posts?post_id=${post_id}`;

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
      const comments = data.comments;
      console.log("Received data:", data);

      const commentSection = document.getElementById("comments-section");
      if (!commentSection) {
        throw new Error("Comment section element not found");
      }

      comments.forEach((comment) => {
        const commentContainer = createCommentContainer(
          comment.text,
          comment.CommentID,
          comment.commenter.username,
          comment.commenter.PersonID,
          comment.commenter.src
        );
        commentSection.appendChild(commentContainer);
      });
    })
    .catch((error) => {
      console.error("Error fetching or processing comments:", error);
    });

  function createCommentContainer(
    commentText,
    comment_id,
    commenter_username,
    commenter_id,
    commenter_src
  ) {
    // Top section with user info
    const topSection = document.createElement("div");
    topSection.className = "review-top";

    // User avatar
    const avatar = document.createElement("img");
    avatar.src = commenter_src;
    avatar.className = "review-avatar";

    // Username
    const usernameElement = document.createElement("span");
    usernameElement.className = "comment-username";
    usernameElement.textContent = commenter_username;

    topSection.appendChild(avatar);
    topSection.appendChild(usernameElement);

    // Comment text
    const textElement = document.createElement("div");
    textElement.className = "review-text";
    textElement.textContent = commentText;

    const container = document.createElement("div");
    container.className = "comment-container";
    container.dataset.commentId = comment_id;
    // Assemble everything
    container.appendChild(topSection);
    container.appendChild(textElement);

    const link = document.createElement("a");
    link.href = `/user/profile?user_id=${commenter_id}`;
    link.className = "comment-link";
    link.style.textDecoration = "none";

    link.appendChild(container);
    return link;
  }

  document.getElementById("add-comment").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission or unwanted behavior

    const comment = document.getElementById("comment-input").value.trim();

    fetch("/posts/comment?post_id=" + post_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ comment }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add comment");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  });
});
