// Load reviews when the page loads
window.onload = function () {
  fetch("/moderator/contentForModeration")
    .then((res) => res.json())
    .then((data) => {
      // Render reviews only
      const reviews = data.reviews || [];
      console.log("Fetched reviews:", reviews); // Debugging log
      const reviewContainer = document.getElementById("pending-reviews");
      reviewContainer.innerHTML = ""; // Clear the container

      reviews.forEach((review) => {
        console.log("Rendering review:", review); // Debugging log
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review-card";

        reviewDiv.innerHTML = `
          <div class="review-content">
            <div class="review-text">
              <strong>POI Name:</strong> ${review.POI_name || "Unknown"}<br>
              <strong>Rating:</strong> ${review.Rating || "No rating"}<br>
              <strong>Review:</strong> ${review.Text || "No review provided"}<br>
              <span>Uploaded By: ${review.username}</span><br>
              <span>Upload Date: ${new Date(review.uploadDate).toLocaleString()}</span><br><br>
              <button onclick="approveReview(${review.ReviewID})">Approve Review</button>
              <button onclick="rejectReview(${review.ReviewID})">Reject Review</button>
            </div>
          </div>
          <hr>
        `;

        reviewContainer.appendChild(reviewDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
};

// Approve a review
window.approveReview = function (reviewId) {
  console.log("Approving review with ID:", reviewId); // Debugging log
  fetch(`/reviews/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ review_id: reviewId }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("Approve response:", result); // Debugging log
      alert(result.message);
      window.onload(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error approving review:", error);
    });
};

// Reject a review
window.rejectReview = function (reviewId) {
  console.log("Rejecting review with ID:", reviewId); // Debugging log
  fetch(`/reviews/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ review_id: reviewId }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("Reject response:", result); // Debugging log
      alert(result.message);
      window.onload(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error rejecting review:", error);
    });
};