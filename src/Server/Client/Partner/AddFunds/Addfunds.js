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
    document.getElementById("balance").textContent = data.Balance;
  })
  .catch((error) => {
    console.error("Error fetching profile data:", error);
  });

document
  .getElementById("payment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form elements
    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const fullName = form["full-name"].value.trim();
    const cardNumber = form["card-number"].value.replace(/\s+/g, "");
    const expiryDate = form["expiry-date"].value;
    const civ = form.civ.value.trim();

    // Simple validation
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (fullName.length < 3) {
      alert("Please enter your full name");
      return;
    }

    // Process the valid data
    const paymentData = {
      amount,
      fullName,
      cardNumber,
      expiryDate,
      civ,
    };

    console.log("Payment data:", paymentData);
    // 2. Make the fetch request
    fetch(`/partner/balance/add?amount=${amount}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add funds: " + error.message);
      });
  });
