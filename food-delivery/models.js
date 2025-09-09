export class User {
  constructor({ name }) {
    if (new.target === User) {
      throw new Error("User is abstract");
    }
    this.name = name;
    this.role = "User";
  }

  summary() {
    return `${this.role}: ${this.name}`;
  }
}

export class Customer extends User {
  constructor({ name, address }) {
    super({ name });
    this.role = "Customer";
    this.address = address;
  }
}

export class DeliveryPartner extends User {
  constructor({ name, vehicleNo }) {
    super({ name });
    this.role = "Delivery Partner";
    this.vehicleNo = vehicleNo;
  }
}

export class Restaurant extends User {
  constructor({ name, cuisine }) {
    super({ name });
    this.role = "Restaurant";
    this.cuisine = cuisine;
  }
}
