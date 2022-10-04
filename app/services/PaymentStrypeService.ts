const stripe = require("stripe")(
  "sk_test_51LoxazGsxDaSwFKwGfasj4WSbJLJKw7aNh7PNlXjR1W56fI6bCNJeDMmNNZOPJRtXwAGzsmidklrltFJic2ZJNNV00fUowpGBl"
);

export class PaymentService {
  public async pay(paymentData: PaymentRequest) {
    const customer = await stripe.customers.create();

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-08-01" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "eur",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
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
