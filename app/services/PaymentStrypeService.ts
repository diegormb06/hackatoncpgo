import { PaymentRequest } from "App/domain/entities/PaymentRequest";
import Env from "@ioc:Adonis/Core/Env";
const stripe = require("stripe")(Env.get("STRIPE_KEY"));
import Logger from "@ioc:Adonis/Core/Logger";

const loggerTag = "PaymentService";

export class PaymentService {
  public async createPaymentIntent(paymentData: PaymentRequest) {
    const { user } = paymentData;

    Logger.info(
      `[${loggerTag}] Criando 'payment intent' para usuário id ${user.id}`
    );

    const customer = await stripe.customers.create({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      phone: user.phone,
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-08-01" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.total_value * 100,
      currency: "brl",
      customer: customer.id,
      description: `Pedido n° ${paymentData.order_id}: usuário id: ${user.id} de ${paymentData.total_quantity} items no valor de R$${paymentData.total_value}`,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { order_id: paymentData.order_id },
      shipping: {
        name: `${user.first_name} ${user.last_name}`,
        phone: user.phone,
        address: {
          city: paymentData.ship_address.city,
          state: paymentData.ship_address.state,
          postal_code: paymentData.ship_address.zipcode,
          line1: paymentData.ship_address.address,
          line2: paymentData.ship_address.complement,
          country: "Brasil",
        },
      },
    });

    Logger.info(`[${loggerTag}] payment intent id: ${paymentIntent.id} criado`);

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51LoxazGsxDaSwFKww2LkMi47dLHPOjmT6yuGQx5N8ol2AKFWUqTi1o2YqCpTqwL7I9XoXZBa6xXhBUjQdHwp5JRb00jMQJgIjv",
    };
  }
}
