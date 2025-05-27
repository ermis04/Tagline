document.addEventListener('DOMContentLoaded', function() {
  // Get partner ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const partner_id = urlParams.get("partner_id");

  // Fetch partner data
  fetch("/partner/data", {
    method: "GET",
    credentials: "include",
  })
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error('Network response was not ok');
  })
  .then((partnerData) => {
    // Update partner info
    document.getElementById("balance").textContent = `€${partnerData.Balance}`;
    document.getElementById("profile-pic-business").src = partnerData.src;
    console.log(partnerData);
    // Now fetch locations for dropdowns
    return fetch('/api/locations');
  })
  .then(response => response.json())
  .then(locations => {
    const locationSelect = document.getElementById('location-select');
    locationSelect.innerHTML = '<option value="">Select a location</option>';
    
    locations.forEach(location => {
      const option = document.createElement('option');
      option.value = location.location_id;
      option.textContent = location.location_name;
      locationSelect.appendChild(option);
    });
  })
  .then(() => {
    // Set up location change listener
    document.getElementById('location-select').addEventListener('change', function() {
      const locationId = this.value;
      const poiSelect = document.getElementById('poi-select');
      
      if (!locationId) {
        poiSelect.innerHTML = '<option value="">Select location first</option>';
        poiSelect.disabled = true;
        return;
      }

      fetch("/location/all")
        .then(response => response.json())
        .then(pois => {
          poiSelect.innerHTML = '<option value="">Select POI</option>';
          pois.forEach(poi => {
            console.log("pois" + poi)
            const option = document.createElement('option');
            option.value = poi.POIID;
            option.textContent = poi.POI_name;
            poiSelect.appendChild(option);
          });
          poiSelect.disabled = false;
        });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    document.getElementById('location-select').innerHTML = '<option value="">Error loading data</option>';
  });
});