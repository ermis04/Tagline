document.addEventListener("DOMContentLoaded", () => {
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

  fetch("/advertisement/partner/all", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((ads) => {
      console.log("Ads data:", ads);
      
      if (ads.length !== 0) {
        document.getElementById("no-ads").style.display = "none";
      }

      ads.forEach((ad) => {
        const adContainer = createAdContainer(
          ad.point_of_interest,
          ad.views,
          ad.cost,
          ad.end_date.split("T")[0],
          ad.AdID
        );
        add_element("ads-frame", adContainer);
      });
    });
});

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

function createAdContainer(poiName, views, cost, endDate, ad_id) {
  const adContainer = document.createElement("div");
  adContainer.className = "ad-container";

  // Top row: location and views
  const topRow = document.createElement("div");
  topRow.className = "space-between";

  const location = document.createElement("p");
  location.textContent = poiName;

  const viewsp = document.createElement("p");
  viewsp.textContent = `${views} views`;

  topRow.appendChild(location);
  topRow.appendChild(viewsp);

  // Middle row: price
  const priceRow = document.createElement("div");
  priceRow.style.display = "flex";
  priceRow.style.alignItems = "center";

  priceRow.innerHTML = `Cost:<h5>${cost}€</h5>`;

  const endDated = document.createElement("div");
  endDated.className = "end-date";
  endDated.innerHTML = `<p>End date: <span>${endDate}</span></p>`;

  // Assemble ad container
  adContainer.appendChild(topRow);
  adContainer.appendChild(priceRow);
  adContainer.appendChild(endDated);

  const link = document.createElement("a");
  link.href = `/partner/ManageAd?ad_id=${ad_id}`;
  link.style.textDecoration = "none";

  link.appendChild(adContainer);

  return link;
}
