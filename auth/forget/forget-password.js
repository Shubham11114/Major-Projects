// Forgot Password Page JS (Demo Simulation)
document.getElementById("forgotForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (email === "") {
    alert("Please enter your registered email address.");
    return;
  }

  // Simulated email sending
  alert(`A password reset link has been sent to ${email}. 📩`);
  document.getElementById("forgotForm").reset();
});
