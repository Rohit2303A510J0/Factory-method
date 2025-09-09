// Base Product class
export class Product {
  constructor({ name, price }) {
    if (new.target === Product) {
      throw new Error("Product is abstract");
    }
    this.name = name;
    this.price = Number(price) || 0;
    this.category = "Product";
  }

  summary() {
    return `${this.name} (${this.category}) - $${this.price}`;
  }
}

// Electronics
export class Electronics extends Product {
  constructor({ name, price, warranty }) {
    super({ name, price });
    this.category = "Electronics";
    this.warranty = warranty || "1 year";
  }
}

// Clothing
export class Clothing extends Product {
  constructor({ name, price, size }) {
    super({ name, price });
    this.category = "Clothing";
    this.size = size || "M";
  }
}

// Books
export class Book extends Product {
  constructor({ name, price, author }) {
    super({ name, price });
    this.category = "Books";
    this.author = author || "Unknown";
  }
}
