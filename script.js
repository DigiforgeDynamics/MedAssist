  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emergencyForm");
  const statusMessage = document.getElementById("statusMessage");
  const locationInput = document.getElementById("location");
  const issueTypeSelect = document.getElementById("issueType");
  const otherIssueInput = document.getElementById("otherIssue");

  // Init EmailJS
  emailjs.init("ZPAFqXcGBUIRZjBN6"); // Replace with your user ID

  // Autofill GPS location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lon = pos.coords.longitude.toFixed(5);
        locationInput.value = `Lat: ${lat}, Lon: ${lon}`;
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        locationInput.placeholder = "Enter location manually";
      }
    );
  }

  // Show/hide "Other" issue input
  issueTypeSelect.addEventListener("change", () => {
    if (issueTypeSelect.value === "other") {
      otherIssueInput.style.display = "block";
      otherIssueInput.required = true;
    } else {
      otherIssueInput.style.display = "none";
      otherIssueInput.required = false;
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const finalIssue =
      form.issueType.value === "other"
        ? form.otherIssue.value
        : form.issueType.value;

    emailjs.send("service_a4r465c", "template_xyu8q0u", {
      trainNumber: form.train_number.value,
      SeatNumber: form.Seat.value,
      location: form.location.value,
      issueType: finalIssue,
      allergies: form.allergies.value,
      passengerName: form.passengerName.value,
      group: form.group.value,
      coachNumber: form.coach.value,
      Email: form.Email.value,
      PhoneNumber: form.PhoneNumber.value,
    })
    .then(() => {
      statusMessage.textContent = "✅ Emergency request sent successfully!";
      statusMessage.style.color = "green";
      form.reset();
      otherIssueInput.style.display = "none";
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      statusMessage.textContent = "❌ Failed to send. Try again.";
      statusMessage.style.color = "red";
    });
  });
});
