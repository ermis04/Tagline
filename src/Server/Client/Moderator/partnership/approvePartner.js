window.onload = function () {
  fetch("/moderator/moderatePartners")
    .then(res => res.json())
    .then(partners => {
      console.log("Fetched partners:", partners);
      const container = document.getElementById("pending-partners");
      container.innerHTML = "";
      partners.forEach(partner => {
        const div = document.createElement("div");
        div.className = "partner-card";
        div.innerHTML = `
          <strong>${partner.BusinessName}</strong><br>
          <span>${partner.BusinessDescription}</span><br>
          <span>Phone: ${partner.phone}</span><br><br>
          <button onclick="approvePartner(${partner.PartnerID})">Accept Partner</button>
          <button onclick="rejectPartner(${partner.PartnerID})">Reject Partner</button>
          <hr>
        `;
        container.appendChild(div);
      });
    });
};

window.approvePartner = function(partnerId) {
  fetch(`/moderator/approvePartner?partner_id=${partnerId}`)
    .then(res => res.json())
    .then(result => {
      alert(result.message);
      window.onload(); // Refresh list
    });
};

window.rejectPartner = function(partnerId) {
  fetch(`/moderator/rejectPartner?partner_id=${partnerId}`)
    .then(res => res.json())
    .then(result => {
      alert(result.message);
      window.onload(); // Refresh list
    });
};