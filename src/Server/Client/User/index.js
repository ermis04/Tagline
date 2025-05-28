function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Check if auth cookie exists
if (!getCookie("tagline_auth")) {
  window.location.href = "/logIn";
}

function createFirstLocationContainer(
  location,
  sights,
  src,
  visited_count = 0,
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
  loadingBarPercent.style.width = `${(visited_count / sights) * 100}%`;

  loadingBar.appendChild(loadingBarPercent);

  container.appendChild(overlay);
  container.appendChild(marker);
  container.appendChild(h3);
  container.appendChild(pSights);
  container.appendChild(loadingBar);

  const link = document.createElement("a");
  link.style.textDecoration = "none";
  link.href = `/location?location_id=${location_id}`;
  link.appendChild(container);

  return link;
}

function createLocationContainer(
  location,
  sights,
  src,
  visited_count = 0,
  location_id,
  isUncharted = false
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

  container.appendChild(overlay);
  container.appendChild(h3);
  container.appendChild(p);

  if (!isUncharted) {
    const loadingBar = document.createElement("span");
    loadingBar.className = "loading-bar";

    const loadingBarPercent = document.createElement("span");
    loadingBarPercent.className = "loading-bar-percent";
    loadingBarPercent.style.width = `${(visited_count / sights) * 100}%`;

    loadingBar.appendChild(loadingBarPercent);
    container.appendChild(loadingBar);
  }

  const link = document.createElement("a");
  link.style.textDecoration = "none";

  link.href = `/location?location_id=${location_id}`;
  link.appendChild(container);

  return link;
}

function createPostContainer(
  username,
  profilePicSrc,
  likesCount,
  imageSrc,
  post_id
) {
  const container = document.createElement("div");
  container.className = "post-container";
  container.style.backgroundImage = `url('${imageSrc}')`;

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
  container.appendChild(userRow);
  container.appendChild(likeRow);

  const link = document.createElement("a");
  link.style.textDecoration = "none";

  link.href = `/posts?post_id=${post_id}`;
  link.appendChild(container);
  return link;
}

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

fetch("/user/data")
  .then((response) => response.json())
  .then((data) => {
    // Populate exploring section
    const exploring = data.locations.filter(
      (location) => location.visited_count != 0
    );

    exploring.forEach((location, index) => {
      const { location_name, poi_count, location_id, src, visited_count } =
        location;

      const locationElement =
        index === 0
          ? createFirstLocationContainer(
              location_name,
              poi_count,
              src,
              visited_count,
              location_id
            )
          : createLocationContainer(
              location_name,
              poi_count,
              src,
              visited_count,
              location_id
            );
      add_element("locations-frame", locationElement);
    });

    // Populate uncharted locations
    const uncharted = data.locations.filter(
      (location) => location.visited_count === 0
    );
    uncharted.forEach((location) => {
      const { location_name, poi_count, location_id, src } = location;
      const unchartedElement = createLocationContainer(
        location_name,
        poi_count,
        src,
        0,
        location_id,
        true
      );
      add_element("uncharted-frame", unchartedElement);
    });

    // Populate Posts

    const posts = data.posts;
    posts.forEach((post) => {
      const { username, userSrc, postSrc, like_count, PostID } = post;
      const postElement = createPostContainer(
        username,
        userSrc,
        like_count,
        postSrc,
        PostID
      );
      add_element("posts-frame", postElement);
    });

    //Static data population
    document.getElementById("userPoints").textContent = data.points_collected;
    document.getElementById("profile-pic-home").src = data.src;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
