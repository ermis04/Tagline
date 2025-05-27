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
    return fetch('/location/all');
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

      fetch("/location/data?location_id=" + locationId, {
        method: "GET",
        credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.pois)
          poiSelect.innerHTML = '<option value="">Select POI</option>';
          data.pois.forEach(poi => {
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


document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const endDate = new Date(document.getElementById('end-date').value);
    const formattedDate = endDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Get form data
    const formData = {
      location_id: document.getElementById('location-select').value,
      PoiID: document.getElementById('poi-select').value,
      cost: document.getElementById('Budget').value,
      title: document.getElementById('title').value,
      Description: document.getElementById('desc').value,
      end_date: formattedDate
    };

    // Validate required fields
    if (!formData.location_id || !formData.PoiID || !formData.cost || 
        !formData.title || !formData.Description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Send data to server
    fetch('/advertisement/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Ad created successfully!');
        // Redirect or clear form as needed
      } else {
        alert('Error: ' + (data.message || 'Failed to create ad'));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to create ad. Please try again.');
    });
  });
});