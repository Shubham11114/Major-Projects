// signup.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (!document.getElementById("terms").checked) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    alert("Account created successfully!");
    form.reset();
  });
});
