// Base Ride class
export class Ride {
  constructor({ name, fare, capacity }) {
    if (new.target === Ride) {
      throw new Error("Ride is abstract");
    }
    this.name = name;
    this.fare = Number(fare) || 0;
    this.capacity = Number(capacity) || 1;
    this.type = "Ride";
  }

  summary() {
    return `${this.type} - ${this.name} ($${this.fare})`;
  }
}

// Mini
export class Mini extends Ride {
  constructor(props) {
    super(props);
    this.type = "Mini";
  }
}

// Sedan
export class Sedan extends Ride {
  constructor(props) {
    super(props);
    this.type = "Sedan";
  }
}

// SUV
export class SUV extends Ride {
  constructor(props) {
    super(props);
    this.type = "SUV";
  }
}

// Auto
export class Auto extends Ride {
  constructor(props) {
    super(props);
    this.type = "Auto";
  }
}
