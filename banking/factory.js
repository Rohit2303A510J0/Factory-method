import { SavingsAccount, CurrentAccount, LoanAccount } from "./models.js";

export class AccountFactory {
  static #registry = {
    savings: SavingsAccount,
    current: CurrentAccount,
    loan: LoanAccount
  };

  static create(type, payload) {
    const Ctor = this.#registry[type?.toLowerCase()];
    if (!Ctor) throw new Error(`Unknown account type: ${type}`);
    return new Ctor(payload);
  }
}
