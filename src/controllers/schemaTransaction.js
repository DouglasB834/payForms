import * as Yup from "yup";
import parsePhoneNumber from "libphonenumber-js";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const schema = Yup.object({
  cartCode: Yup.string().required(),
  paymentType: Yup.mixed()
    .oneOf(["credit_card", "billet"])
    .required("campo obrigatorio"),
  installments: Yup.number()
    .min(1)
    .test(
      "test-max-installments",
      "installments must be less than or equal to 12",
      function (value) {
        const paymentType = this.parent.paymentType;

        if (paymentType === "credit_card") {
          return value <= 12;
        }
        return value <= 1;
      }
    ),
  customerName: Yup.string().required().min(3),
  customerEmail: Yup.string().email().required(),
  costumerMobile: Yup.string().test(
    "is-valid-mobile",
    "${path} is not a valid mobile number",
    (value) => parsePhoneNumber(value, "BR").isValid()
  ),
  customerDocument: Yup.string()
    .required("CPF ou CNPJ obrigatorio")
    .test(
      "is-valid-document",
      "${path} is not a valid document",
      (value) => cpf.isValid(value) || cnpj.isValid(value)
    ),
  billingAddress: Yup.string().required("Endereço obrigatório"),
  billingNumber: Yup.string().required("numero  obrigatório"),
  billingNeighborhood: Yup.string().required(),
  billingCity: Yup.string().required("Cidade obrigatório"),
  billingState: Yup.string().required("Estado obrigatório"),
  billingZipCode: Yup.string().required("Nome da rua obrigatório"),
  creditCardNumber: Yup.string().when("paymentType", (paymentType, schema) =>
    paymentType[0] === "credit_card" ? schema.required() : schema.notRequired()
  ),
  creditCardExpiration: Yup.string().when(
    "paymentType",
    (paymentType, schema) =>
      paymentType[0] === "credit_card"
        ? schema.required()
        : schema.notRequired()
  ),
  creditCardHolderName: Yup.string().when(
    "paymentType",
    (paymentType, schema) =>
      paymentType[0] === "credit_card"
        ? schema.required()
        : schema.notRequired()
  ),
  creditCardCvv: Yup.string().when("paymentType", (paymentType, schema) =>
    paymentType[0] === "credit_card" ? schema.required() : schema.notRequired()
  ),
});
