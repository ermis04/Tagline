function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Check if auth cookie exists
if (!getCookie("tagline_auth")) {
  window.location.href = "/logIn";
}

console.log(document.cookie);
const load_profile_pic = (user_pic_link) => {
  const img = document.createElement("img");
  img.src = user_id;
  return img;
};

function createFirstLocationContainer(location, sights) {
  const container = document.createElement("div");
  container.className = "location-container first-location";

  const overlay = document.createElement("span");
  overlay.className = "black-overlay";

  const marker = document.createElement("p");
  marker.className = "marker";
  marker.textContent = "You are here";

  const h3 = document.createElement("h3");
  h3.textContent = location;

  const pSights = document.createElement("p");
  pSights.textContent = `${sights} sights`;

  const loadingBar = document.createElement("span");
  loadingBar.className = "loading-bar";

  const loadingBarPercent = document.createElement("span");
  loadingBarPercent.className = "loading-bar-percent";

  loadingBar.appendChild(loadingBarPercent);

  container.appendChild(overlay);
  container.appendChild(marker);
  container.appendChild(h3);
  container.appendChild(pSights);
  container.appendChild(loadingBar);

  return container;
}

function createLocationContainer(location, sights) {
  const container = document.createElement("div");
  container.className = "location-container";

  const overlay = document.createElement("span");
  overlay.className = "black-overlay";

  const h3 = document.createElement("h3");
  h3.textContent = location;

  const p = document.createElement("p");
  p.textContent = `${sights} sights`;

  const loadingBar = document.createElement("span");
  loadingBar.className = "loading-bar";

  const loadingBarPercent = document.createElement("span");
  loadingBarPercent.className = "loading-bar-percent";

  loadingBar.appendChild(loadingBarPercent);

  container.appendChild(overlay);
  container.appendChild(h3);
  container.appendChild(p);
  container.appendChild(loadingBar);

  return container;
}

function createPostContainer(username, profilePicSrc, likesCount, likeIconSrc) {
  const container = document.createElement("div");
  container.className = "post-container";

  // --- Top Row ---
  const userRow = document.createElement("div");
  userRow.style.display = "flex";
  userRow.style.alignItems = "center";
  userRow.style.gap = "8px"; // adds space between image and text

  const profilePic = document.createElement("img");
  profilePic.className = "small-profile-pic";
  profilePic.src = profilePicSrc;
  profilePic.alt = "Profile picture";

  const usernameP = document.createElement("p");
  usernameP.textContent = username;

  userRow.appendChild(profilePic);
  userRow.appendChild(usernameP);

  // --- Like Row ---
  const likeRow = document.createElement("div");
  likeRow.style.display = "flex";
  likeRow.style.alignItems = "center";
  likeRow.style.gap = "6px"; // space between icon and number

  const likeIcon = document.createElement("img");
  likeIcon.className = "like";
  likeIcon.src = likeIconSrc; // leave src as is
  likeIcon.alt = "Like icon";
  likeIcon.style.width = "20px"; // force consistent size
  likeIcon.style.height = "20px";

  const likesP = document.createElement("p");
  likesP.textContent = likesCount;
  likesP.style.margin = "0"; // remove default margin

  likeRow.appendChild(likeIcon);
  likeRow.appendChild(likesP);

  // Append to main container
  container.appendChild(userRow);
  container.appendChild(likeRow);

  return container;
}

function add_element(parentId, container) {
  document.addEventListener("DOMContentLoaded", () => {
    const parent = document.getElementById(parentId);
    if (parent && container) {
      parent.appendChild(container);
    }
  });
}

add_element("locations-frame", createFirstLocationContainer("Patras", 5));
add_element("locations-frame", createLocationContainer("Patras", 5));
add_element("locations-frame", createLocationContainer("Patras", 5));

add_element("posts-frame", createPostContainer("Patras", ".natalie.png", 5));
add_element("posts-frame", createPostContainer("Patras", ".natalie.png", 5));
add_element("posts-frame", createPostContainer("Patras", ".natalie.png", 5));
add_element("posts-frame", createPostContainer("Patras", ".natalie.png", 5));

add_element("uncharted-frame", createLocationContainer("Patras", 5));
add_element("uncharted-frame", createLocationContainer("Patras", 5));
add_element("uncharted-frame", createLocationContainer("Patras", 5));

fetch("/user/data")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch("/reviews", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    rating: 5,
    text: "Great place!",
    poiId: 1
  })
})
.then(res => res.json())
.then(data => console.log("Review added:", data))
.catch(err => console.error("Error adding review:", err));