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
    document.getElementById("balance").textContent = `€${data.Balance}`;
    document.getElementById("profile-pic-business").src = data.src;
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });

fetch("/partner/statistics", {
  method: "GET",
  credentials: "include",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    document.getElementById("total-ads").textContent = data.total_ads;
    document.getElementById("total-clicks").textContent = data.total_clicks;
    document.getElementById("total-views").textContent = data.total_views;
    document.getElementById("total-cost").textContent = `$${data.total_cost}`;
  })
  .catch((error) => {
    console.error("Error fetching statistics data:", error);
  });
