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
  img.src = user_pic_link;
  return img;
};

function createFirstLocationContainer(
  location,
  sights,
  src,
  progress = 0,
  location_id
) {
  const container = document.createElement("div");
  container.className = "location-container first-location";
  container.style.backgroundImage = `url('${src}')`;

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

function createLocationContainer(
  location,
  sights,
  src,
  progress = 0,
  location_id
) {
  const container = document.createElement("div");
  container.className = "location-container";
  container.style.backgroundImage = `url('${src}')`;

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

  const link = document.createElement("a");
  link.href = `/location?location_id=${location_id}`;
  link.appendChild(container);

  return link;
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
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

// add_element("locations-frame", createFirstLocationContainer("Patras", 5));
// add_element("locations-frame", createLocationContainer("Patras", 5));
// add_element("locations-frame", createLocationContainer("Patras", 5));

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

    data.locations.forEach((location, index) => {
      const { location_name, description, location_id, src } = location;

      const locationElement =
        index === 0
          ? createFirstLocationContainer(
              location_name,
              5,
              src,
              0.5,
              location_id
            )
          : createLocationContainer(location_name, 5, src, 0.2, location_id);

      add_element("locations-frame", locationElement);
    });

    document.getElementById("userPoints").textContent = data.points_collected;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// fetch("/reviews", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     rating: 5,
//     text: "What a nice pizza!!",
//     poiId: 1,
//     src: "https://lh3.googleusercontent.com/geougc-cs/AB3l90CduAvz0N02bOgmT2n-ZJSp0Ig1U7zJAcelWJv27PnCpUNQYfc-R7-B1RGyJ2yCyYkqH4YvM1LVVMHHXksxqsVhq8zRmDkZaYIhLvqqA_Rt6vZQOFji6kr6-BzqKiCYVTI5NNR0Pg=s225-p-k-rw",
//     share_as_post: false,
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log("Review added:", data))
//   .catch((err) => console.error("Error adding review:", err));
