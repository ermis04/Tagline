window.onload = function () {
  fetch("/advertisement/all")
    .then((res) => res.json())
    .then((ads) => {
      console.log("Fetched ads:", ads); // Debugging log
      const container = document.getElementById("pending-ads");
      container.innerHTML = ""; // Clear the container

      ads.forEach((ad) => {
        console.log("Rendering ad:", ad); // Debugging log
        const adDiv = document.createElement("div");
        adDiv.className = "ad-card";

        adDiv.innerHTML = `
          <strong>${ad.title}</strong><br>
          <span>Description: ${
            ad.Description || "No description provided"
          }</span><br>
          <span>Budget: $${ad.cost}</span><br>
          <span>Uploaded: ${ad.start_date}</span><br>
          <span>Ends: ${ad.end_date}</span><br><br>
          <button onclick="acceptAd(${ad.AdID})">Accept Advertisement</button>
          <button onclick="rejectAd(${ad.AdID})">Reject Advertisement</button>
          <hr>
        `;

        container.appendChild(adDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching advertisements:", error);
    });
};

window.acceptAd = function (adId) {
  fetch(`/advertisement/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ad_id: adId }),
  })
    .then((res) => res.json())
    .then((result) => {
      alert(result.message);
      window.onload(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error accepting advertisement:", error);
    });
};

window.rejectAd = function (adId) {
  fetch(`/advertisement/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ad_id: adId }),
  })
    .then((res) => res.json())
    .then((result) => {
      alert(result.message);
      window.onload(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error rejecting advertisement:", error);
    });
};
