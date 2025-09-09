import { UserFactory } from "./factory.js";

const createForm = document.querySelector("#create-form");
const typeEl = document.querySelector("#type");
const dynamicFields = document.querySelector("#dynamic-fields");
const userList = document.querySelector("#user-list");
const codebox = document.querySelector("#code-snippet");

const simForm = document.querySelector("#simulate-form");
const selCustomer = document.querySelector("#select-customer");
const selRestaurant = document.querySelector("#select-restaurant");
const selDelivery = document.querySelector("#select-delivery");
const simulation = document.querySelector("#simulation");

const users = [];

// Fields depending on user type
const fieldsFor = {
  customer: [
    { name: "name", placeholder: "Customer Name" },
    { name: "address", placeholder: "Address" }
  ],
  delivery: [
    { name: "name", placeholder: "Delivery Partner Name" },
    { name: "vehicleNo", placeholder: "Vehicle Number" }
  ],
  restaurant: [
    { name: "name", placeholder: "Restaurant Name" },
    { name: "cuisine", placeholder: "Cuisine" }
  ]
};

// Render fields when type changes
function renderFields(type) {
  dynamicFields.innerHTML = "";
  fieldsFor[type].forEach((f) => {
    const input = document.createElement("input");
    input.name = f.name;
    input.placeholder = f.placeholder;
    input.required = true;
    dynamicFields.appendChild(input);
  });
}
renderFields(typeEl.value);
typeEl.addEventListener("change", () => renderFields(typeEl.value));

// Handle create user
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = typeEl.value;
  const payload = Object.fromEntries(new FormData(createForm));

  const obj = UserFactory.create(type, payload);
  users.push(obj);
  renderUsers();
  updateDropdowns();

  codebox.textContent = `const obj = UserFactory.create("${type}", ${JSON.stringify(
    payload
  )});`;

  createForm.reset();
  renderFields(type); // reset fields
});

// Render users
function renderUsers() {
  userList.innerHTML = "";
  users.forEach((u) => {
    const div = document.createElement("div");
    div.className = `card ${u.role.toLowerCase().replace(" ", "")}`;
    div.innerHTML = `
      <h3>${iconFor(u.role)} ${u.role}</h3>
      <p><strong>Name:</strong> ${u.name}</p>
      ${u.address ? `<p><strong>Address:</strong> ${u.address}</p>` : ""}
      ${u.vehicleNo ? `<p><strong>Vehicle:</strong> ${u.vehicleNo}</p>` : ""}
      ${u.cuisine ? `<p><strong>Cuisine:</strong> ${u.cuisine}</p>` : ""}
    `;
    userList.appendChild(div);
  });
}

// Update dropdowns for simulation
function updateDropdowns() {
  const customers = users.filter((u) => u.role === "Customer");
  const restaurants = users.filter((u) => u.role === "Restaurant");
  const deliveries = users.filter((u) => u.role === "Delivery Partner");

  fillSelect(selCustomer, customers);
  fillSelect(selRestaurant, restaurants);
  fillSelect(selDelivery, deliveries);
}

function fillSelect(select, arr) {
  select.innerHTML = "";
  arr.forEach((u, i) => {
    const opt = document.createElement("option");
    opt.value = i; // index in users array
    opt.textContent = u.name;
    select.appendChild(opt);
  });
}

// Handle simulation
simForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const c = users[selCustomer.value];
  const r = users[selRestaurant.value];
  const d = users[selDelivery.value];

  if (!c || !r || !d) {
    simulation.textContent =
      "⚠️ Need one Customer, one Restaurant, and one Delivery Partner.";
    return;
  }

  simulation.innerHTML = `
    🍽️ <strong>${r.name}</strong> 
    → serves <strong>${c.name}</strong> 
    → delivered by 🛵 <strong>${d.name}</strong>
  `;
});

// Helper emoji
function iconFor(role) {
  if (role === "Customer") return "👤";
  if (role === "Delivery Partner") return "🛵";
  if (role === "Restaurant") return "🍽️";
  return "❓";
}
