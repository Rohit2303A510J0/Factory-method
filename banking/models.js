// Base Account class
export class Account {
  constructor({ holder }) {
    if (new.target === Account) {
      throw new Error("Account is abstract");
    }
    this.holder = holder;
    this.type = "Account";
    this.transactions = [];
  }

  addTransaction(type, amount) {
    const date = new Date().toLocaleString();
    this.transactions.push({ type, amount, date });
  }

  summary() {
    return `${this.type} for ${this.holder}`;
  }
}

// Savings Account
export class SavingsAccount extends Account {
  constructor({ holder, balance }) {
    super({ holder });
    this.type = "Savings Account";
    this.balance = Number(balance) || 0;
  }

  deposit(amount) {
    this.balance += Number(amount);
    this.addTransaction("Deposit", amount);
  }

  withdraw(amount) {
    if (amount > this.balance) return false;
    this.balance -= Number(amount);
    this.addTransaction("Withdraw", amount);
    return true;
  }
}

// Current Account
export class CurrentAccount extends Account {
  constructor({ holder, balance, limit }) {
    super({ holder });
    this.type = "Current Account";
    this.balance = Number(balance) || 0;
    this.limit = Number(limit) || 0;
  }

  deposit(amount) {
    this.balance += Number(amount);
    this.addTransaction("Deposit", amount);
  }

  withdraw(amount) {
    if (amount > this.balance + this.limit) return false;
    this.balance -= Number(amount);
    this.addTransaction("Withdraw", amount);
    return true;
  }
}

// Loan Account
export class LoanAccount extends Account {
  constructor({ holder, amount }) {
    super({ holder });
    this.type = "Loan Account";
    this.amount = Number(amount) || 0;
  }

  repay(amount) {
    this.amount -= Number(amount);
    this.addTransaction("Repay", amount);
  }
}
