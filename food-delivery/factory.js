import { Customer, DeliveryPartner, Restaurant } from "./models.js";

export class UserFactory {
  static #registry = {
    customer: Customer,
    delivery: DeliveryPartner,
    restaurant: Restaurant
  };

  static create(type, payload) {
    const Ctor = this.#registry[type?.toLowerCase()];
    if (!Ctor) {
      throw new Error(`Unknown user type: ${type}`);
    }
    return new Ctor(payload);
  }
}
