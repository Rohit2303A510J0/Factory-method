import { ProductFactory } from "./factory.js";

const createForm = document.querySelector("#create-form");
const typeEl = document.querySelector("#type");
const dynamicFields = document.querySelector("#dynamic-fields");
const productList = document.querySelector("#product-list");
const codebox = document.querySelector("#code-snippet");

const cartItemsEl = document.querySelector("#cart-items");
const totalEl = document.querySelector("#total");

const products = [];
const cart = [];

// Fields per category
const fieldsFor = {
  electronics: [
    { name: "name", placeholder: "Product Name" },
    { name: "price", placeholder: "Price", type: "number" },
    { name: "warranty", placeholder: "Warranty" }
  ],
  clothing: [
    { name: "name", placeholder: "Product Name" },
    { name: "price", placeholder: "Price", type: "number" },
    { name: "size", placeholder: "Size" }
  ],
  books: [
    { name: "name", placeholder: "Book Name" },
    { name: "price", placeholder: "Price", type: "number" },
    { name: "author", placeholder: "Author" }
  ]
};

// Render fields dynamically
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

// Handle product creation
createForm.addEventListener("submit", e => {
  e.preventDefault();
  const type = typeEl.value;
  const payload = Object.fromEntries(new FormData(createForm));

  const product = ProductFactory.create(type, payload);
  products.push(product);
  renderProducts();

  codebox.textContent = `const product = ProductFactory.create("${type}", ${JSON.stringify(payload)});`;

  createForm.reset();
  renderFields(type);
});

// Render products
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = `card ${p.category.toLowerCase()}`;
    div.innerHTML = `
      <h3>${iconFor(p.category)} ${p.name}</h3>
      <p><strong>Price:</strong> $${p.price}</p>
      ${p.warranty ? `<p><strong>Warranty:</strong> ${p.warranty}</p>` : ""}
      ${p.size ? `<p><strong>Size:</strong> ${p.size}</p>` : ""}
      ${p.author ? `<p><strong>Author:</strong> ${p.author}</p>` : ""}
      <button class="add-cart">Add to Cart</button>
    `;
    productList.appendChild(div);

    div.querySelector(".add-cart").addEventListener("click", () => addToCart(p));
  });
}

// Cart handling
function addToCart(product) {
  cart.push(product);
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach((p, i) => {
    const div = document.createElement("div");
    div.textContent = `${p.name} - $${p.price}`;
    cartItemsEl.appendChild(div);
    total += p.price;
  });
  totalEl.textContent = `Total: $${total}`;
}

// Emoji helper
function iconFor(cat) {
  if (cat === "Electronics") return "💻";
  if (cat === "Clothing") return "👕";
  if (cat === "Books") return "📚";
  return "❓";
}
