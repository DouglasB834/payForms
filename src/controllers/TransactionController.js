import Transation from "../models/Transaction";

import Cart from "../models/Cart";
import { schema } from "./schemaTransaction";

class TransationsController {
  async create(req, res) {
    try {
      const {
        cartCode,
        paymentType,
        installments,
        customerName,
        customerEmail,
        costumerMobile,
        customerDocument,
        billingAddress,
        bollingNumber,
        billingNeighborhood,
        billingCity,
        billingState,
        billingZipCode,
        creditCardNumber,
        creditCardExpiration,
        creditCardHolderName,
        creditCardCvv,
      } = req.body;

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation schema fails" });
      }

      const cart = await Cart.findOne({ code: cartCode });
      if (!cart) {
        // throw new Error("Cart not found", 400);
        return res.status(400).json({ error: "Cart not found" });
      }
      const transations = await Transation;

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ error: `${error}` });
    }
  }
}

export default new TransationsController();
