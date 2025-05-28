const urlParams = new URLSearchParams(window.location.search);
const ad_id = urlParams.get("ad_id");

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
      const balance = document.getElementById("balance");
      if (balance) {
        balance.textContent = `€${data.Balance}`;
      }
    });

  fetch("/advertisement/data?ad_id=" + ad_id, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((ad) => {
      console.log(ad);
      window.ad = ad;
      // update stats
      const clicks = document.getElementById("total-clicks");
      if (clicks) {
        clicks.textContent = ad.clicks;
      }
      const views = document.getElementById("total-views");
      if (views) {
        views.textContent = ad.views;
      }
      const cost = document.getElementById("total-cost");
      if (cost) {
        cost.textContent = `$${ad.cost}`;
      }

      const title = document.getElementById("ad-title");
      if (title) title.textContent = ad.title;

      const description = document.getElementById("ad-description");
      if (description) description.textContent = ad.Description;

      const location = document.getElementById("location");
      if (location) location.textContent = ad.location;

      const poi = document.getElementById("poi");
      if (poi) poi.textContent = ad.point_of_interest;

      const status = document.getElementById("status");
      if (status) status.textContent = ad.status;

      const startDate = document.getElementById("start-date");
      if (startDate) startDate.textContent = ad.start_date.split("T")[0];

      const endDate = document.getElementById("end-date");
      if (endDate) endDate.textContent = ad.end_date.split("T")[0];
    });
});

function add_element(parentId, container) {
  const parent = document.getElementById(parentId);
  if (parent && container) {
    parent.appendChild(container);
  }
}

const deleteButton = document.getElementById("delete-ad-button");
if (deleteButton) {
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    const confirmDelete = confirm("Are you sure you want to delete this ad?");
    if (confirmDelete) {
      fetch(`/advertisement/delete?ad_id=${ad_id}`, {
        method: "GET",
      })
        .then((res) => {
          if (res.ok) {
            alert("Ad deleted successfully.");
            window.location.href = "/partner/manageAds"; // Redirect to home or listing page
          } else {
            alert("Failed to delete ad.");
          }
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert("An error occurred while deleting the ad.");
        });
    }
  });
}

// // EDIT button handler
const editButton = document.getElementById("edit-ad-button");
if (editButton) {
  editButton.addEventListener("click", () => {
    console.log("Edit button clicked");
    handleEditAd();
  });
}
function handleEditAd() {
  const modal = document.getElementById("editModal"); // <-- corrected ID
  const textInput = document.getElementById("text-new");
  const descriptionInput = document.getElementById("description-new");
  const costInput = document.getElementById("cost-new");
  const endDateInput = document.getElementById("endDate-new");
  const form = document.getElementById("editForm");
  const closeBtn = document.getElementById("closeModal");

  // Fill with current ad data
  textInput.value = window.ad.title;
  descriptionInput.value = window.ad.Description;
  costInput.value = window.ad.cost;
  endDateInput.value = window.ad.end_date.split("T")[0];

  // Show modal
  modal.removeAttribute("hidden");

  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  // Now re-select inputs from the new cloned form
  const newText = newForm.querySelector("#text-new");
  const newDescription = newForm.querySelector("#description-new");
  const newCost = newForm.querySelector("#cost-new");
  const newEndDate = newForm.querySelector("#endDate-new");

  newForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedText = newText.value.trim();
    const updatedDescription = newDescription.value.trim();
    const updatedCost = parseFloat(newCost.value);
    const updatedEndDate = newEndDate.value;

    console.log("Updated values:", {
      updatedText,
      updatedDescription,
      updatedCost,
      updatedEndDate,
    });
    if (
      !updatedText ||
      !updatedDescription ||
      isNaN(updatedCost) ||
      !updatedEndDate
    ) {
      return;
    }

    fetch(`/advertisement/edit?ad_id=${ad_id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedText,
        Description: updatedDescription,
        cost: updatedCost,
        end_date: updatedEndDate,
      }),
    })
      .then((response) => {
        if (response.ok) {
          modal.setAttribute("hidden", true);
        } else {
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.setAttribute("hidden", true);
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.setAttribute("hidden", true);
    }
  });
}
