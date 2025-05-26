const createFriendContainer = (username, src, friend_id, points_collected) => {
  const friendContainer = document.createElement("div");
  friendContainer.className = "friend-container";

  const img = document.createElement("img");
  img.src = src || "/images/defaultProfile.png";
  img.className = "profile-pic";

  const name = document.createElement("span");
  name.textContent = username;
  name.className = "friend-name";

  friendContainer.appendChild(img);
  friendContainer.appendChild(name);

  const link = document.createElement("a");
  link.href = `/user/profile?user_id=${friend_id}&from=friends`;
  link.style.textDecoration = "none";
  link.appendChild(friendContainer);

  return link;
};

const createLeaderboardContainer = (
  username,
  src,
  friend_id,
  points_collected,
  index
) => {
  const friendContainer = document.createElement("div");
  friendContainer.className = "friend-container-leaderboard";
  const leftitems = document.createElement("div");
  leftitems.className = "left-items";

  const rank = document.createElement("span");
  rank.textContent = `${index + 1}`;
  rank.className = "friend-rank";

  const img = document.createElement("img");
  img.src = src || "/images/defaultProfile.png";
  img.className = "profile-pic leaderboard-profile-pic";

  const name = document.createElement("span");
  name.textContent = username;
  name.className = "friend-name";

  const points = document.createElement("span");
  points.textContent = `Points: ${points_collected}`;
  points.className = "friend-points";

  leftitems.appendChild(rank);
  leftitems.appendChild(img);
  leftitems.appendChild(name);
  friendContainer.appendChild(leftitems);
  friendContainer.appendChild(points);

  const link = document.createElement("a");
  link.href = `/user/profile?user_id=${friend_id}&from=friends`;
  link.style.textDecoration = "none";
  link.appendChild(friendContainer);

  return link;
};

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

fetch("/user/data", { credentials: "include" })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.getElementById("points").textContent = data.points_collected;
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });

fetch("/user/friends/get", { credentials: "include" })
  .then((response) => {
    return response.json();
  })
  .then((friends) => {
    if (friends.length !== 0) {
      document.getElementById("no-friends").style.display = "none";
    }

    friends.forEach((friend) => {
      const { username, src, friendUserID } = friend;
      const friendContainer = createFriendContainer(
        username,
        src,
        friendUserID
      );
      add_element("friends-field", friendContainer);
    });
  });

fetch("/user/friends/leaderboard", { credentials: "include" })
  .then((response) => {
    return response.json();
  })
  .then((leaderboard) => {
    leaderboard.forEach((friend, index) => {
      const { username, profileImage, UserID, points_collected } = friend;
      const leaderboardContainer = createLeaderboardContainer(
        username,
        profileImage,
        UserID,
        points_collected,
        index
      );
      add_element("leaderboard-field", leaderboardContainer);
    });
  });
