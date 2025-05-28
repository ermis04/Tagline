const urlParams = new URLSearchParams(window.location.search);
const poiID = urlParams.get("poi_id");

// Star rating selection
const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = parseInt(star.dataset.value);
    ratingInput.value = rating;

    stars.forEach((s) =>
      s.classList.toggle("selected", parseInt(s.dataset.value) <= rating)
    );
  });
});

// Show "Share as post" if image is selected
const imageInput = document.getElementById("image");
const sharePostContainer = document.getElementById("share-post-container");

imageInput.addEventListener("change", () => {
  sharePostContainer.classList.toggle("hidden", !imageInput.files.length);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("close-button").href = `/poi?poi_id=${poiID}`;
});

document.getElementById("review-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("review-text").value.trim();
  const rating = parseInt(document.getElementById("rating").value);
  const src = document.getElementById("image").value.trim();
  const share_as_post = document.querySelector(
    'input[name="shareAsPost"]'
  ).checked;

  // Optional: Validate
  if (!text || rating === 0) {
    alert("Please provide both a review and a star rating.");
    return;
  }

  const data = {
    text,
    rating,
    poiId: poiID,
    src,
    share_as_post,
  };

  console.log("Submitting review:", data);

  try {
    const response = await fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      showToast("Review submitted successfully!");
      setTimeout(() => {
        window.location.href = `/poi?poi_id=${poiID}`;
      }, 3000);
    } else {
      alert(result.error || "Failed to submit review.");
    }
  } catch (err) {
    console.error("Submit error:", err);
    alert("An error occurred while submitting your review.");
  }
});

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
