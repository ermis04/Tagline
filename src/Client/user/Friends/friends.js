const createFriendContainer = (username, src, friend_id) => {
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

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

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
