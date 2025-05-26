const urlParams = new URLSearchParams(window.location.search);
const locationId = urlParams.get("location_id");

function createPoiContainer(poi_name, src, points, POIID) {
  const container = document.createElement("div");
  container.className = "location-container";
  container.style.backgroundImage = `url('${src}')`;

  const overlay = document.createElement("span");
  overlay.className = "black-overlay";

  const h3 = document.createElement("h3");
  h3.textContent = poi_name;

  const p = document.createElement("p");
  p.textContent = `${points} points`;

  container.appendChild(overlay);
  container.appendChild(h3);
  container.appendChild(p);

  const link = document.createElement("a");
  link.href = `/poi?poi_id=${POIID}`;
  link.appendChild(container);
  link.style.textDecoration = "none";

  return link;
}

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

fetch("/location/data?location_id=" + locationId, {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Update the location Data.
    document.querySelector(
      ".location-nav"
    ).style.backgroundImage = `url('${data.locationData.src}')`;
    document.querySelector(".location-nav").style.backgroundSize = "cover";
    document.querySelector(".location-nav").style.backgroundPosition = "center";
    document.getElementById("location-name").textContent =
      data.locationData.location_name;
    document.getElementById("location-description").textContent =
      data.locationData.description;
    const progressValue = data.locationData.progress * 100;
    const progress_percent = Math.floor(progressValue) + "%";
    document.getElementById("progress").textContent = progress_percent;
    document.getElementById("bar").style.width = progress_percent;
    document.getElementById("poi-count").textContent = data.pois.length;

    // Add the POIs to the page.
    data.pois.forEach((poi) => {
      const poiContainer = createPoiContainer(
        poi.POI_name,
        poi.src,
        poi.points,
        poi.POIID
      );
      add_element("pois-frame", poiContainer);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
