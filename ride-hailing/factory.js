import { Mini, Sedan, SUV, Auto } from "./models.js";

export class RideFactory {
  static #registry = {
    mini: Mini,
    sedan: Sedan,
    suv: SUV,
    auto: Auto
  };

  static create(type, payload) {
    const Ctor = this.#registry[type?.toLowerCase()];
    if (!Ctor) throw new Error(`Unknown ride type: ${type}`);
    return new Ctor(payload);
  }
}
