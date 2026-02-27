// Simple front-end validation and demo login message
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please enter both email and password.");
    return;
  }

  // Dummy login validation
  if (email === "user@wonderhub.com" && password === "12345") {
    alert("Welcome to WonderHub! 🌍");
    window.location.href = "index.html"; // redirect to home/tourism page
  } else {
    alert("Invalid credentials. Try again!");
  }
});
