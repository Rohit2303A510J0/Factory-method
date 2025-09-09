import { AccountFactory } from "./factory.js";

const createForm = document.querySelector("#create-form");
const typeEl = document.querySelector("#type");
const dynamicFields = document.querySelector("#dynamic-fields");
const accountList = document.querySelector("#account-list");
const transactionLog = document.querySelector("#transactions");
const codebox = document.querySelector("#code-snippet");

const accounts = [];

// Fields per type
const fieldsFor = {
  savings: [
    { name: "holder", placeholder: "Account Holder" },
    { name: "balance", placeholder: "Balance", type: "number" }
  ],
  current: [
    { name: "holder", placeholder: "Account Holder" },
    { name: "balance", placeholder: "Balance", type: "number" },
    { name: "limit", placeholder: "Overdraft Limit", type: "number" }
  ],
  loan: [
    { name: "holder", placeholder: "Account Holder" },
    { name: "amount", placeholder: "Loan Amount", type: "number" }
  ]
};

// Render dynamic input fields
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

// Handle account creation
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = typeEl.value;
  const payload = Object.fromEntries(new FormData(createForm));

  const account = AccountFactory.create(type, payload);
  accounts.push(account);
  renderAccounts();

  codebox.textContent = `const account = AccountFactory.create("${type}", ${JSON.stringify(payload)});`;

  createForm.reset();
  renderFields(type);
});

// Render accounts as cards
function renderAccounts() {
  accountList.innerHTML = "";
  accounts.forEach((acc, i) => {
    const div = document.createElement("div");
    div.className = `card ${acc.type.toLowerCase().replace(" ", "")}`;
    div.innerHTML = `
      <h3>${iconFor(acc.type)} ${acc.type}</h3>
      <p><strong>Holder:</strong> ${acc.holder}</p>
      ${acc.balance !== undefined ? `<p><strong>Balance:</strong> ${acc.balance}</p>` : ""}
      ${acc.limit !== undefined ? `<p><strong>Limit:</strong> ${acc.limit}</p>` : ""}
      ${acc.amount !== undefined ? `<p><strong>Loan:</strong> ${acc.amount}</p>` : ""}
      <div class="buttons">
        ${acc.type !== "Loan Account" ? `<button class="deposit">Deposit</button> <button class="withdraw">Withdraw</button>` : `<button class="repay">Repay</button>`}
        <button class="view-transactions">View Transactions</button>
      </div>
    `;
    accountList.appendChild(div);

    // Buttons
    div.querySelector(".deposit")?.addEventListener("click", () => handleDeposit(acc));
    div.querySelector(".withdraw")?.addEventListener("click", () => handleWithdraw(acc));
    div.querySelector(".repay")?.addEventListener("click", () => handleRepay(acc));
    div.querySelector(".view-transactions").addEventListener("click", () => showTransactions(acc));
  });
}

// Button handlers
function handleDeposit(acc) {
  const amount = prompt("Enter deposit amount:");
  if (!amount || isNaN(amount)) return;
  acc.deposit(amount);
  renderAccounts();
}

function handleWithdraw(acc) {
  const amount = prompt("Enter withdraw amount:");
  if (!amount || isNaN(amount)) return;
  const success = acc.withdraw(amount);
  if (!success) alert("Insufficient balance!");
  renderAccounts();
}

function handleRepay(acc) {
  const amount = prompt("Enter repayment amount:");
  if (!amount || isNaN(amount)) return;
  acc.repay(amount);
  renderAccounts();
}

function showTransactions(acc) {
  transactionLog.innerHTML = `<h4>${acc.holder} (${acc.type})</h4>`;
  if (acc.transactions.length === 0) {
    transactionLog.innerHTML += "<p>No transactions yet.</p>";
    return;
  }
  const ul = document.createElement("ul");
  acc.transactions.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.date} – ${t.type}: ${t.amount}`;
    ul.appendChild(li);
  });
  transactionLog.appendChild(ul);
}

// Emoji helper
function iconFor(type) {
  if (type === "Savings Account") return "💰";
  if (type === "Current Account") return "🏦";
  if (type === "Loan Account") return "💵";
  return "❓";
}
