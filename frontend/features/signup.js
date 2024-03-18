document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://traq-986l.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (response.ok) {
        showSuccessAlert("Signup successful!");
      } else {
        const errorData = await response.json();

        // Check for the specific error message related to email already registered
        if (
          response.status === 409 &&
          errorData.message === "Email already been registered"
        ) {
          showErrorAlert("Email is already registered");
        } else {
          showErrorAlert(
            errorData.message || "Password must be at least 8 characters"
          );
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      showErrorAlert("Network error");
    }
  });

function showSuccessAlert(message) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  }).then(() => {
    // Callback function to execute after the user clicks "OK"
    window.location.href = "./login.html"; // Redirect to the login page
  });
}

function showErrorAlert(errorMessage) {
  Swal.fire({
    icon: "error",
    title: "Error during signup",
    text: errorMessage,
  });
}
