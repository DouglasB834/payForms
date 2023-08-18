import { Router } from "express";
import CartsController from "./controllers/CartsController";
import TransactionsController from "./controllers/TransactionController";

const payRouter = Router();

//criar rotas payRouter.get("/rota", arquivo ou classe);
payRouter.get("/carts", CartsController.getAll);
payRouter.post("/carts", CartsController.create);
payRouter.patch("/carts/:id", CartsController.update);
payRouter.delete("/carts/:id", CartsController.delete);

// rotas para pagamentos Transations 
payRouter.post("/transations", TransactionsController.create);

export default payRouter;
