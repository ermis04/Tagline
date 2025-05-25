const urlParams = new URLSearchParams(window.location.search);
const poiID = urlParams.get("poi_id");

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

      // Update click listener
      // setupVisitedButton(data.poiData.POIID, data.poiData.visited);
    })
    .catch((error) => {
      console.error("Error reloading POI data:", error);
    });
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
    });
});

loadPoiData();
