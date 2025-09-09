import { Electronics, Clothing, Book } from "./models.js";

export class ProductFactory {
  static #registry = {
    electronics: Electronics,
    clothing: Clothing,
    books: Book
  };

  static create(type, payload) {
    const Ctor = this.#registry[type?.toLowerCase()];
    if (!Ctor) throw new Error(`Unknown product type: ${type}`);
    return new Ctor(payload);
  }
}
