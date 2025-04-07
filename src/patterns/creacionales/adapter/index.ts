import { WinstonAdapter } from "./logger-adapter";
import { ILogger } from "./logger-local";

class MyApp {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  doSomething() {
    this.logger.log("Doing something important");
  }
}

const logger = new WinstonAdapter();
const app = new MyApp(logger);
app.doSomething();

// EJERCICIO DE PASARELA DE PAGO
// TODO: Pasar a archivos independientes

// INTERFAZ COMUN PARA CADA ADAPTADOR
interface IPaymentGateway {
  processPayment(amount: number): void;
}

// SERVICIOS PARA CADA PASARELA DE PAGO
class PaypalService {
  sendPayment(amount: number) {
    console.log(`Procesando pago de $${amount} con PayPal`);
  }
}

class StripeService {
  makeCharge(amount: number) {
    console.log(`Procesando pago de $${amount} con Stripe`);
  }
}

class MercadoPagoService {
  pay(amount: number) {
    console.log(`Procesando pago de $${amount} con Mercado Pago`);
  }
}

class PaypalAdapter implements IPaymentGateway {
  private paypalService: PaypalService;

  constructor(service: PaypalService) {
    this.paypalService = service;
  }

  processPayment(amount: number): void {
    this.paypalService.sendPayment(amount);
  }
}

class StripeAdapter implements IPaymentGateway {
  private stripeService: StripeService;

  constructor(service: StripeService) {
    this.stripeService = service
  }

  processPayment(amount: number): void {
    this.stripeService.makeCharge(amount);
  }
}

class MercadoPagoAdapter implements IPaymentGateway {
  private mercadoPagoService: MercadoPagoService;

  constructor(service: MercadoPagoService) {
    this.mercadoPagoService = service;
  }

  processPayment(amount: number): void {
    this.mercadoPagoService.pay(amount);
  }
}

const paymentAmount = 100
const paypalProcessor: IPaymentGateway = new PaypalAdapter(new PaypalService());
const stripeProcessor: IPaymentGateway = new StripeAdapter(new StripeService())
const mercadoPagoProcessor: IPaymentGateway = new MercadoPagoAdapter(new MercadoPagoService())


paypalProcessor.processPayment(paymentAmount)
stripeProcessor.processPayment(paymentAmount);
mercadoPagoProcessor.processPayment(paymentAmount);
