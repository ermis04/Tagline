const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("user_id");

function showTab(tab) {
  const postsTab = document.getElementById("posts-tab");
  const reviewsTab = document.getElementById("reviews-tab");

  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((btn) => btn.classList.remove("active"));

  if (tab === "posts") {
    postsTab.style.display = "block";
    reviewsTab.style.display = "none";
    tabButtons[0].classList.add("active");
  } else {
    postsTab.style.display = "none";
    reviewsTab.style.display = "block";
    tabButtons[1].classList.add("active");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.style.display = "none";
    }, 300);
  }, 2500);
}

function createReviewContainer(
  reviewText,
  reviewRating,
  poi_image,
  review_id,
  poi_name
) {
  const content = document.createElement("div");
  content.className = "review-content";

  // Avatar + Username + Stars Row
  const topRow = document.createElement("div");
  topRow.className = "review-top";

  const avatar = document.createElement("img");
  avatar.src = poi_image; // Replace with actual avatar source if available
  avatar.className = "review-avatar";

  const poiName = document.createElement("span");
  poiName.className = "review-poiName";
  poiName.textContent = poi_name;

  topRow.appendChild(avatar);
  topRow.appendChild(poiName);

  const stars = document.createElement("span");
  stars.className = "review-stars";
  stars.innerHTML = "★".repeat(reviewRating) + "☆".repeat(5 - reviewRating);

  // Review text
  const text = document.createElement("p");
  text.className = "review-text";
  text.textContent = reviewText;

  const buttonRow = document.createElement("div");
  buttonRow.className = "review-buttons";

  const editButton = document.createElement("button");
  editButton.className = "review-btn edit";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    handleEditReview(review_id, reviewText, reviewRating);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "review-btn delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    handleDeleteReview(review_id);
  });

  buttonRow.appendChild(editButton);
  buttonRow.appendChild(deleteButton);

  content.appendChild(topRow);
  content.appendChild(stars);
  content.appendChild(text);

  const container = document.createElement("div");
  container.className = "review-container";
  container.setAttribute("data-review-id", review_id);

  container.appendChild(content);
  container.appendChild(buttonRow);

  return container;
}

function createPostContainer(likesCount, imageSrc, post_id) {
  const container = document.createElement("div");
  container.className = "post-container";
  container.style.backgroundImage = `url('${imageSrc}')`;

  // --- Like Row ---
  const likeRow = document.createElement("div");
  likeRow.style.display = "flex";
  likeRow.style.alignItems = "center";
  likeRow.style.gap = "6px"; // space between icon and number

  const likeIcon = document.createElement("img");
  likeIcon.className = "like";
  likeIcon.src = "/images/like.png"; // leave src as is
  likeIcon.alt = "Like icon";
  likeIcon.style.width = "20px"; // force consistent size
  likeIcon.style.height = "20px";

  const likesP = document.createElement("p");
  likesP.textContent = likesCount;
  likesP.style.margin = "0"; // remove default margin

  likeRow.appendChild(likeIcon);
  likeRow.appendChild(likesP);

  // Append to main container
  container.appendChild(likeRow);

  const link = document.createElement("a");
  link.style.textDecoration = "none";

  link.href = `/posts?post_id=${post_id}`;
  link.appendChild(container);
  link.className = "post-link";
  return link;
}

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

function handleDeleteReview(review_id) {
  const modal = document.getElementById("confirm-modal");
  const confirmYes = document.getElementById("confirm-yes");
  const confirmNo = document.getElementById("confirm-no");

  modal.style.display = "flex";

  // Clean up old event listeners
  const newYes = confirmYes.cloneNode(true);
  confirmYes.parentNode.replaceChild(newYes, confirmYes);

  const newNo = confirmNo.cloneNode(true);
  confirmNo.parentNode.replaceChild(newNo, confirmNo);

  newYes.addEventListener("click", () => {
    modal.style.display = "none";

    fetch(`/reviews/delete?review_id=${review_id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          // Remove review from DOM
          const reviewContainer = document.querySelector(
            `.review-container[data-review-id="${review_id}"]`
          );
          if (reviewContainer) {
            reviewContainer.remove();
            showToast("Review deleted successfully!");
          }
        } else {
          showToast("Failed to delete review.");
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        showToast("An error occurred.");
      });
  });

  newNo.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

function handleEditReview(review_id, currentText, currentRating) {
  const modal = document.getElementById("edit-modal");
  const textarea = document.getElementById("edit-review-text");
  const starsContainer = document.getElementById("edit-stars");
  const saveBtn = document.getElementById("save-review");
  const cancelBtn = document.getElementById("cancel-edit");

  textarea.value = currentText;

  let selectedRating = currentRating;

  function renderStars(rating) {
    starsContainer.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.className = "star" + (i <= rating ? " filled" : "");
      star.addEventListener("click", () => {
        selectedRating = i;
        renderStars(selectedRating);
      });
      starsContainer.appendChild(star);
    }
  }

  renderStars(currentRating);

  // Reset event listeners
  const newSave = saveBtn.cloneNode(true);
  const newCancel = cancelBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newSave, saveBtn);
  cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

  newSave.addEventListener("click", () => {
    const updatedText = textarea.value.trim();

    if (updatedText === "") {
      showToast("Review text cannot be empty.");
      return;
    }

    // Submit updated review via API
    fetch(`/reviews/edit?review_id=` + review_id, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Text: updatedText,
        Rating: selectedRating,
      }),
    })
      .then((response) => {
        if (response.ok) {
          showToast("Review updated!");
          modal.style.display = "none";

          // Update the DOM directly if needed:
          const container = document.querySelector(
            `.review-container[data-review-id="${review_id}"]`
          );
          if (container) {
            const textEl = container.querySelector(".review-text");
            const starsEl = container.querySelector(".review-stars");
            if (textEl) textEl.textContent = updatedText;
            if (starsEl)
              starsEl.innerHTML =
                "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);
          }
        } else {
          showToast("Failed to update review.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        showToast("Error updating review.");
      });
  });

  newCancel.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  const userId = getUserIdFromPage(); // Get user ID from URL or other source

  fetch(
    userId ? `/user/profile/data?user_id=${userID}` : "/user/profile/data",
    {
      method: "GET",
      credentials: "include",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);

      // Ensure elements exist before modifying
      const usernameEl = document.getElementById("username");
      if (usernameEl) usernameEl.textContent = `@${data.username}`;

      const profilePicEl = document.getElementById("profile-pic");
      if (profilePicEl)
        profilePicEl.src = data.src || "/images/defaulprofile.png";

      // Render the posts
      const posts = data.posts || [];
      if (posts.length !== 0) {
        const noPostsEl = document.getElementById("no-posts-message");
        if (noPostsEl) noPostsEl.style.display = "none";
      }
      posts.forEach((post) => {
        const postContainer = createPostContainer(
          post.like_count,
          post.postSrc,
          post.PostID
        );
        add_element("posts-frame", postContainer);
      });

      // Render the reviews
      const reviews = data.reviews || [];
      if (reviews.length !== 0) {
        const noReviewsEl = document.getElementById("no-reviews-message");
        if (noReviewsEl) noReviewsEl.style.display = "none";
      }
      reviews.forEach((review) => {
        let poiData;

        fetch(`/poi/data?poi_id=${review.PoiID}`, {
          method: "GET",
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            poiData = data.poiData;

            const reviewContainer = createReviewContainer(
              review.Text,
              review.Rating,
              poiData.src,
              review.ReviewID,
              poiData.POI_name
            );
            add_element("reviews-frame", reviewContainer);
          })
          .catch((error) => {
            console.error("Error fetching POI data:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching profile data:", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const actionContainer = document.getElementById("profile-action-container");

  // Assume userID is set dynamically from your data or URL param
  const userID = getUserIdFromPage(); // Replace this with your actual logic

  if (!actionContainer) return;

  if (userID) {
    // Show "Add Friend"
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Friend";
    addBtn.className = "add-friend-button";
    addBtn.type = "button"; // Use type="button" to avoid accidental form submits
    actionContainer.appendChild(addBtn);
  } else {
    // Show "Edit Profile"
    const editLink = document.createElement("a");
    editLink.href = "/user/profile/edit";
    editLink.style.textDecoration = "none";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Profile";
    editBtn.className = "add-friend-button";
    editBtn.type = "button";

    editLink.appendChild(editBtn);
    actionContainer.appendChild(editLink);
  }
});

function getUserIdFromPage() {
  return new URLSearchParams(window.location.search).get("user_id");
}

//TODO: Add functionality to handle the "Add Friend" button click
