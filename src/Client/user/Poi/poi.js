const urlParams = new URLSearchParams(window.location.search);
const poiID = urlParams.get("poi_id");

function createAdContainer(
  businessName,
  businessDescription,
  imageSrc,
  phone,
  ad_id
) {
  const container = document.createElement("div");
  container.className = "ad-container";

  const textContent = document.createElement("div");
  textContent.className = "ad-text";

  // Business name and "Ad" badge
  const nameRow = document.createElement("div");
  nameRow.className = "ad-name-row";

  const businessTitle = document.createElement("span");
  businessTitle.className = "ad-business-name";
  businessTitle.textContent = businessName;

  const badge = document.createElement("span");
  badge.className = "ad-badge";
  badge.textContent = "Ad";

  nameRow.appendChild(businessTitle);
  nameRow.appendChild(badge);

  // Description
  const description = document.createElement("p");
  description.className = "ad-description";
  description.textContent = businessDescription;

  const link = document.createElement("a");
  link.style.textDecoration = "none";
  link.href = `tel:${phone}`; // Keep the tel link

  const phoneLine = document.createElement("p");
  phoneLine.className = "ad-phone";
  phoneLine.textContent = `📞 ${phone}`;
  link.appendChild(phoneLine);

  fetch(`/advertisement/collect?ad_id=${ad_id}&event=view`);

  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent immediate navigation
    fetch(`/advertisement/collect?ad_id=${ad_id}&event=click`, {
      method: "GET",
      credentials: "include",
    }).finally(() => {
      // Let the fetch request start before navigating
      setTimeout(() => {
        window.location.href = `tel:${phone}`;
      }, 1000); // 100ms is enough
    });
  });

  textContent.appendChild(nameRow);
  textContent.appendChild(description);
  textContent.appendChild(link);

  // Image
  const image = document.createElement("img");
  image.src = imageSrc;
  image.className = "ad-image";

  // Combine everything
  container.appendChild(textContent);
  container.appendChild(image);

  return container;
}

function createReviewContainer(
  reviewText,
  reviewRating,
  userId,
  userPicture,
  username
) {
  const content = document.createElement("div");
  content.className = "review-content";

  // Avatar + Username + Stars Row
  const topRow = document.createElement("div");
  topRow.className = "review-top";

  const avatar = document.createElement("img");
  avatar.src = userPicture; // Replace with actual avatar source if available
  avatar.className = "review-avatar";

  const poiName = document.createElement("span");
  poiName.className = "review-poiName";
  poiName.textContent = username;

  topRow.appendChild(avatar);
  topRow.appendChild(poiName);

  const stars = document.createElement("span");
  stars.className = "review-stars";
  stars.innerHTML = "★".repeat(reviewRating) + "☆".repeat(5 - reviewRating);

  // Review text
  const text = document.createElement("p");
  text.className = "review-text";
  text.textContent = reviewText;

  content.appendChild(topRow);
  content.appendChild(stars);
  content.appendChild(text);

  const link = document.createElement("a");
  link.href = `/user/profile?user_id=${userId}`;
  link.appendChild(content);
  link.style.textDecoration = "none";

  return link;
}

// Helper to update button UI
function updateVisitedButton(button, isVisited) {
  button.classList.remove("loading");

  if (isVisited) {
    button.textContent = "Mark as not visited";
    button.classList.add("red");
  } else {
    button.textContent = "Mark as visited";
    button.classList.remove("red");
  }
}

function loadPoiData() {
  fetch("/poi/data?poi_id=" + poiID, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Reloaded POI data:", data);
      window.poiData = data.poiData;

      // Update UI
      document.querySelector(
        ".location-nav"
      ).style.backgroundImage = `url('${data.poiData.src}')`;
      document.querySelector(".location-nav").style.backgroundSize = "cover";
      document.querySelector(".location-nav").style.backgroundPosition =
        "center";
      document.getElementById("location-name").textContent =
        data.poiData.POI_name;
      document.getElementById("location-description").textContent =
        data.poiData.POI_description;
      document.getElementById("points").textContent = data.poiData.points;
      document.getElementById(
        "backButton"
      ).href = `/location?location_id=${data.poiData.location_id}`;

      // Update visited button
      const button = document.getElementById("markasvisited-button");
      updateVisitedButton(button, data.poiData.visited);

      // Update Reviews

      const reviews = data.reviews;

      if (reviews.length !== 0) {
        document.getElementById("no-reviews").style.display = "none";
      }

      reviews.forEach((review) => {
        const reviewContainer = createReviewContainer(
          review.Text,
          review.Rating,
          review.userId,
          review.userPicture,
          review.username
        );
        add_element("reviews-frame", reviewContainer);
      });

      const ads = data.ads;
      if (ads.length === 0) {
        document.getElementById("no-ads-title").style.display = "none";
      }
      ads.forEach((ad) => {
        const adContainer = createAdContainer(
          ad.BusinessName,
          ad.Description,
          ad.src,
          ad.phone,
          ad.AdID
        );
        add_element("ads-frame", adContainer);
      });
    })
    .catch((error) => {
      console.error("Error reloading POI data:", error);
    });
}

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("markasvisited-button")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const button = document.getElementById("markasvisited-button");
      button.disabled = true;
      button.classList.add("loading");

      const endpoint = window.poiData.visited
        ? "/poi/unmarkVisited"
        : "/poi/markVisited";

      fetch(`${endpoint}?poi_id=${poiID}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("Visit state updated:", result);
          loadPoiData(); // Refresh everything after toggle
          button.disabled = false;
        })
        .catch((err) => {
          console.error("Toggle error:", err);
          button.textContent = "Error";
          button.disabled = false;
        });

      if (!window.poiData.visited) {
        setTimeout(() => {
          window.location.href = `/poi/review?poi_id=${poiID}`;
        }, 1000);
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // Initial load of POI data
  loadPoiData();
});
