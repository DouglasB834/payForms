// create schema para usar no mongose
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    cartCode: {
      type: Number,
      required: true,
    },
    code: {
      //codigo transação
      type: String,
      required: true,
      unique: true,
    },
    status: {
      // status da transação inicial, aprovada ou não
      type: String,
      enum: [
        "started",
        "processing",
        "pending",
        "approved",
        "refused", //nao aprovado
        "refunded", // reembolso
        "chargeback", //quando cancela
        "error", //erro"
      ],
      required: true,
    },
    paymentType: {
      //formas de  pagamento
      type: String,
      enum: ["credit_card", "debit", "billet", "pix", "cash"],
      //   required: true,
    },
    installments: {
      //percelas
      type: Number,
    },
    total: {
      type: Number,
    },
    transactionId: {
      type: String,
    },
    processorResponse: {
      //resposta do processador onde pode rasterar operação
      type: String,
    },
    customerEmail: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerMobile: {
      type: String,
    },
    customerDocument: {
      type: String,
    },
    billingAddress: {
      type: String,
    },
    billingNumber: {
      type: String,
    },
    billingNeighborhood: {
      type: String,
    },
    billingCity: {
      type: String,
    },
    billingState: {
      type: String,
    },
    billingZipCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transation", Schema);
