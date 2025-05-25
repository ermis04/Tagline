const urlParams = new URLSearchParams(window.location.search);
const poiID = urlParams.get("poi_id");

fetch("/poi/data?poi_id=" + poiID, {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Update the location Data.
    document.querySelector(
      ".location-nav"
    ).style.backgroundImage = `url('${data.poiData.src}')`;
    document.querySelector(".location-nav").style.backgroundSize = "cover";
    document.querySelector(".location-nav").style.backgroundPosition = "center";
    document.getElementById("location-name").textContent =
      data.poiData.POI_name;
    document.getElementById("location-description").textContent =
      data.poiData.POI_description;

    document.getElementById("points").textContent = data.poiData.points;


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
