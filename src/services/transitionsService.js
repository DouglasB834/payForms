import Cart from "../models/Cart";

class transationsService {
  async process({
    cardCode,
    paymentType,
    installments,
    costumer,    
    billing,
    creditCard,
  }) {
    const cart = Cart.findOne({ code: cartCode });
    if (!cart) {
      throw new Error("Cart not found");
    }
  }
}
export default new transationsService();
