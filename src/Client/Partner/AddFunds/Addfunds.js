const urlParams = new URLSearchParams(window.location.search);
const partner_id = urlParams.get("partner_id");

fetch("/partner/data", {
  method: "GET",
  credentials: "include",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });
