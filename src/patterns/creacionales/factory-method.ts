enum BurgerType {
  Chicken = "chicken",
  Beef = "beef",
}

interface Hamburger {
  prepare (): void;
}

class ChickendHamburger implements Hamburger {
  prepare (): void {
    console.log("Preparando una 🍔 de 🐥");
  }
}

class BeefHamburger implements Hamburger {
  prepare (): void {
    console.log("Preparando una 🍔 de 🍖");
  }
}

abstract class Restaurant {
  protected abstract createHamburger (): Hamburger;

  orderHamburger () {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  createHamburger (): Hamburger {
    return new ChickendHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  createHamburger (): Hamburger {
    return new BeefHamburger();
  }
}

// Ejercicio 1

interface ReportMethod {
  generate (): void;
}

class SalesReport implements ReportMethod {
  generate (): void {
    console.log("Generando informe de ventas");
  }
}

class InventoryReport implements ReportMethod {
  generate (): void {
    console.log("Generanfo informe de inventario");
  }
}

abstract class ReportFactory {
  protected abstract createReport (): ReportMethod;

  generateReport () {
    const report = this.createReport();
    report.generate();
  }
}

class SalesReportFacroty extends ReportFactory {
  protected createReport (): ReportMethod {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  protected createReport (): ReportMethod {
    return new InventoryReport();
  }
}

// Ejercicio 2: Sistema de gestión de productos para una tienda en línea
interface Product {
  getDetail (): void;
}

class Clothes implements Product {
  constructor(private size: string, private color: string) {
    this.size = size;
    this.color = color;
  }

  getDetail (): void {
    console.log(`Ropa - Talla: ${this.size}, Color: ${this.color}`);
  }
}

class Food implements Product {
  constructor(private name: string, private expirationDate: string) {
    this.name = name;
    this.expirationDate = expirationDate;
  }

  getDetail (): void {
    console.log(
      `Comida - Nombre: ${this.name}, Fecha de caducidad: ${this.expirationDate}`
    );
  }
}

class Electronica implements Product {
  constructor(private brand: string, private model: string) {
    this.brand = brand;
    this.model = model;
  }

  getDetail (): void {
    console.log(`Eletronica - Marca: ${this.brand}, Model: ${this.model}`);
  }
}

abstract class ProductFactory {
  protected abstract createProduct (): Product;

  generateProduct () {
    const product = this.createProduct();
    product.getDetail();
  }
}

class ClothesFactory extends ProductFactory {
  private size: string;
  private color: string;

  constructor(size: string, color: string) {
    super();
    this.size = size;
    this.color = color;
  }

  protected createProduct (): Product {
    return new Clothes(this.size, this.color);
  }
}

class ElectronicaFactory extends ProductFactory {
  private brand: string;
  private model: string;

  constructor(brand: string, model: string) {
    super();
    this.brand = brand;
    this.model = model;
  }

  protected createProduct (): Product {
    return new Electronica(this.brand, this.model);
  }
}

class FoodFactory extends ProductFactory {
  constructor(private name: string, private expirationDate: string) {
    super();
    this.name = name;
    this.expirationDate = expirationDate;
  }

  protected createProduct (): Product {
    return new Food(this.name, this.expirationDate);
  }
}

const clothesFactory = new ClothesFactory("M", "Rojo");
const electronicaFactory = new ElectronicaFactory("Sony", "Xperia Z");
const alimentoFactory = new FoodFactory("Arroz", "2026-12-31");

// Generar productos a través de sus fábricas
clothesFactory.generateProduct(); // Imprime: Producto: Ropa - Talla: M, Color: Rojo
electronicaFactory.generateProduct(); // Imprime: Producto: Electrónica - Marca: Sony, Modelo: Xperia Z
alimentoFactory.generateProduct(); // Imprime: Producto: Alimento - Nombre: Arroz, Fecha de vencimiento: 2026-12-31

function main () {
  let restaurant: Restaurant; // se va a definir en tiempo de ejecución

  const burgerType: BurgerType = BurgerType.Chicken;

  switch (burgerType) {
    case BurgerType.Chicken:
      restaurant = new ChickenRestaurant();
      break;
    case BurgerType.Beef:
      restaurant = new BeefRestaurant();
      break;
    default:
      throw new Error("Restaurante no disponible");
  }
  restaurant.orderHamburger();
}
