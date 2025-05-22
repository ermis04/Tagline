function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Check if auth cookie exists
if (!getCookie("tagline_auth")) {
  window.location.href = "/logIn";
}

const load_profile_pic = (user_pic_link) => {
  const img = document.createElement("img");
  img.src = user_id;
  return img;
};
