const form = document.getElementById("signup-form");
const statusEl = document.getElementById("status");

const API_BASE = "https://sms-rentals-api.onrender.com";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";

  const phone = document.getElementById("phone").value.trim();
  const city = document.getElementById("city").value.trim();
  const max_price = parseInt(document.getElementById("max_price").value, 10);

  if (!phone || !city || !max_price) {
    statusEl.textContent = "Please fill out all fields.";
    return;
  }

  try {
    statusEl.textContent = "Signing you up…";

    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        city,
        max_price,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    statusEl.textContent =
      "You're signed up! You'll start receiving alerts soon.";

    form.reset();
    document.getElementById("city").value = "Austin";
  } catch (err) {
    console.error(err);
    statusEl.textContent =
      "Something went wrong. Please try again in a moment.";
  }
});
