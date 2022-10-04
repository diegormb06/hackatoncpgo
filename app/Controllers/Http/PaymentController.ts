import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import { PaymentService } from "App/services/PaymentStrypeService";
import PaymentRequestValidator from "App/Validators/PaymentRequestValidator";

export default class PaymentController {
  async receivePayment({ request }: http) {
    // await request.validate(PaymentRequestValidator);
    const paymentData = request.all();
    const paymentParams = await new PaymentService().pay(
      paymentData as PaymentRequest
    );

    return paymentParams;
  }
}
