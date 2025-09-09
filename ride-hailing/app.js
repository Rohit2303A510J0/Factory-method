import { RideFactory } from "./factory.js";

const createForm = document.querySelector("#create-form");
const typeEl = document.querySelector("#type");
const dynamicFields = document.querySelector("#dynamic-fields");
const rideList = document.querySelector("#ride-list");
const bookingInfo = document.querySelector("#booking-info");
const codebox = document.querySelector("#code-snippet");

const rides = [];

// Fields per ride type
const fieldsFor = {
  mini: [
    { name: "name", placeholder: "Ride Name" },
    { name: "fare", placeholder: "Base Fare", type: "number" },
    { name: "capacity", placeholder: "Capacity", type: "number" }
  ],
  sedan: [
    { name: "name", placeholder: "Ride Name" },
    { name: "fare", placeholder: "Base Fare", type: "number" },
    { name: "capacity", placeholder: "Capacity", type: "number" }
  ],
  suv: [
    { name: "name", placeholder: "Ride Name" },
    { name: "fare", placeholder: "Base Fare", type: "number" },
    { name: "capacity", placeholder: "Capacity", type: "number" }
  ],
  auto: [
    { name: "name", placeholder: "Ride Name" },
    { name: "fare", placeholder: "Base Fare", type: "number" },
    { name: "capacity", placeholder: "Capacity", type: "number" }
  ]
};

// Render input fields
function renderFields(type) {
  dynamicFields.innerHTML = "";
  fieldsFor[type].forEach(f => {
    const input = document.createElement("input");
    input.name = f.name;
    input.placeholder = f.placeholder;
    input.type = f.type || "text";
    input.required = true;
    dynamicFields.appendChild(input);
  });
}
renderFields(typeEl.value);
typeEl.addEventListener("change", () => renderFields(typeEl.value));

// Handle ride creation
createForm.addEventListener("submit", e => {
  e.preventDefault();
  const type = typeEl.value;
  const payload = Object.fromEntries(new FormData(createForm));

  const ride = RideFactory.create(type, payload);
  rides.push(ride);
  renderRides();

  codebox.textContent = `const ride = RideFactory.create("${type}", ${JSON.stringify(payload)});`;

  createForm.reset();
  renderFields(type);
});

// Render ride cards
function renderRides() {
  rideList.innerHTML = "";
  rides.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = `card ${r.type.toLowerCase()}`;
    div.innerHTML = `
      <h3>${iconFor(r.type)} ${r.name}</h3>
      <p><strong>Fare:</strong> $${r.fare}</p>
      <p><strong>Capacity:</strong> ${r.capacity}</p>
      <button class="book">Book Ride</button>
    `;
    rideList.appendChild(div);

    div.querySelector(".book").addEventListener("click", () => bookRide(r));
  });
}

// Book ride simulation
function bookRide(ride) {
  bookingInfo.innerHTML = `
    ✅ Ride booked: ${ride.name} (${ride.type}) <br>
    Fare: $${ride.fare} | Capacity: ${ride.capacity}
  `;
}

// Emoji helper
function iconFor(type) {
  if (type === "Mini") return "🚗";
  if (type === "Sedan") return "🚙";
  if (type === "SUV") return "🚐";
  if (type === "Auto") return "🛺";
  return "❓";
}
