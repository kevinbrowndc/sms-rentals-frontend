const form = document.getElementById("signupForm");
const statusEl = document.getElementById("status");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#c0392b" : "#2ecc71";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("Submitting…");

  const formData = new FormData(form);

  const payload = {
    phone: formData.get("phone").trim(),
    city: formData.get("city"),
    max_price: Number(formData.get("max_price")),
  };

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) {
      setStatus(data.detail || "Signup failed. Please try again.", true);
      return;
    }

    form.reset();
    setStatus("Success! Check your phone for a confirmation text.");
  } catch (err) {
    setStatus("Network error. Please try again.", true);
  }
});
