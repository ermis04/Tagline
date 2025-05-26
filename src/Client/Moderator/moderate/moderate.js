// Place this in a <script> tag at the end of Moderate.html

fetch("/moderator/posts", {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((posts) => {
    const postsSection = document.getElementById("posts-section");
    posts.forEach((post) => {
      const div = document.createElement("div");
      div.textContent = post.title; // or whatever fields you have
      postsSection.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Error fetching posts:", error);
  });