import { PaymentRequest } from "App/domain/entities/PaymentRequest";
import Env from "@ioc:Adonis/Core/Env";
const stripe = require("stripe")(Env.get("STRIPE_KEY"));

export class PaymentService {
  public async pay(paymentData: PaymentRequest) {
    const customer = await stripe.customers.create();

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-08-01" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.total_value,
      currency: "brl",
      customer: customer.id,
      description: `Venda para o usuário ${paymentData.user_id} de ${paymentData.total_quantity} items no valor de ${paymentData.total_value}`,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: paymentData,
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51LoxazGsxDaSwFKww2LkMi47dLHPOjmT6yuGQx5N8ol2AKFWUqTi1o2YqCpTqwL7I9XoXZBa6xXhBUjQdHwp5JRb00jMQJgIjv",
    };
  }
}
