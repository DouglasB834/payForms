import Cart from "../models/Cart";

export default new (class CartsController {
  async getAll(req, res) {
    try {
      const carts = await Cart.find(); //retorna todos
      // const carts = await Cart.find({ code: "50" }); //retorna todos
      return res.status(200).json(carts);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "Cart Ja existe" });
    }
  }
  async create(req, res) {
    try {
      const { code, price } = req.body;
      if (price < 0) {
        return res.status(400).json({ message: "Preço negativo " });
      }

      const findCart = await Cart.findOne({ code });
      if (findCart) {
        return res.status(404).json({ message: "Card code ja existe" });
      }
      const cart = await Cart.create({ code, price });

      return res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "Cart não encontrado" });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { code, price } = req.body;
      // const cart = await Cart.findByIdAndUpdate(id,  );
      const cart = await Cart.findByIdAndUpdate(id, { code, price });
      if (!cart) {
        return res.status(404).json({ message: "Cart não encontrado" });
      }
      // const newcart = await cart.updateOne({ code, price });
      return res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "Cart não encontrado" });
    }
    // Cart.findByIdAndUpdate(id, req.body, {new: true})
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      // await Cart.findByIdAndDelete(id);
      const cart = await Cart.findByIdAndDelete(id);
      if (!cart) {
        return res.status(404).json({ message: "Cart não encontrado delete" });
      }
      // await cart.deleteOne();
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "Cart não encontrado" });
    }
  }
})();
