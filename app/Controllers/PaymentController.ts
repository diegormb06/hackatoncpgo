import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import { PaymentRequest } from "domain/entities/PaymentRequest";
import { PaymentService } from "App/services/PaymentService";
import PaymentRequestValidator from "App/Validators/PaymentRequestValidator";
import Logger from "@ioc:Adonis/Core/Logger";

const loggerTag = "PaymentController";

export default class PaymentController {
  private readonly paymentServices: PaymentService = new PaymentService();

  async createPaymentIntent({ request }: http) {
    await request.validate(PaymentRequestValidator);
    const paymentData = request.all();

    const paymentParams = await this.paymentServices.createPaymentIntent(
      paymentData as PaymentRequest
    );

    return paymentParams;
  }

  async savePaymentData({ request }: http) {
    const paymentData = request.all();

    Logger.info(
      `[${loggerTag}] - Dados do Pagamento ${JSON.stringify(paymentData)}`
    );
  }

  public async createIntegrationLink({ params }: http) {
    const { accountId } = params;

    const link = await this.paymentServices.createStripeIntegrationLink(
      accountId
    );

    return link;
  }
}
