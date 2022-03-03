const { object, string, boolean, number } = require("yup");

class FilterYup {
  cartBody = object()
    .shape({
      id: number().required("O campo e obrigatorio"),
    })
    .noUnknown();

  cartParams = object()
    .shape({
      id: string().matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "Campo de ID invalido"
      ),
    })
    .noUnknown();

  orderBody = object()
    .shape({
      userinfos_id: number("Preencha o endereço de entrega").required(
        "Preencha o endereço de entrega"
      ),
      payment_id: number("Escolha uma forma de pagamento").required(
        "Escolha uma forma de pagamento"
      ),
      is_paid: boolean().default(false),
      is_delivered: boolean().default(false),
    })
    .noUnknown();

  orderParams = object()
    .shape({
      id: number().required(),
    })
    .noUnknown();

  orderitemsBody = object()
    .shape({
      name: string().required("O campo nome e obrigatorio!"),
      image: string(),
      priceTotal: number().required("O campo priceTotal e obrigatorio!"),
      description: string().required("O campo descricao e obrigatorio!"),
    })
    .noUnknown();

  orderitemsParams = object()
    .shape({
      id: number().required(),
    })
    .noUnknown();

  productBody = object()
    .shape({
      name: string().required("Campo nome e obrigatorio").min(3),
      spec_id: string().required("O campo spec_id é obrigatorio"),
      image_id: number(),
      slug: string(50),
      image_url: string().nullable(),
      price: number("is-decimal", "invalid decimal", (value) => {
        (value + "").match(/^\d*\.{1}\d*$/);
      }).required("O campo preço e obrigatorio"),
      rating: number().min(0).max(5).default(1),
      countinstock: number().default(1).min(1),
      description: string(),
    })
    .noUnknown();

  productParams = object()
    .shape({
      id: string()
        .required()
        .matches(
          /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
          "Campo de ID invalido"
        ),
    })
    .noUnknown();

  specBody = object()
    .shape({
      name: string().required("Campo nome é obrigatorio!"),
    })
    .noUnknown();

  specParams = object()
    .shape({
      id: number().required("Informe qual spec!"),
    })
    .noUnknown();

  userinfoBody = object()
    .shape({
      fullname: string(255).required("O campo nome e obrigatorio!"),
      address: string(50).required("O campo endereço e obrigatorio"),
      city: string(255).required("O campo cidade e obrigatorio"),
      postal_code: string()
        .required("O campo CEP e obrigatorio")
        .min(8, "CEP Invalido")
        .max(9, "CEP Invalido"),
      county: string().required("O campo estado e obrigatorio"),
    })
    .noUnknown();

  userinfoParams = object()
    .shape({
      id: number().required(),
    })
    .noUnknown();

  paymentBody = object()
    .shape({
      type: string(20).required("Escolha um metodo de pagamento"),
      number: string()
        .nullable(true)
        .when("type", {
          is: (numb) => numb === "Credit" || numb === "Debit",
          then: string(20).required("Digite o numero do cartao"),
        }),
      password: string()
        .nullable(true)
        .when("type", {
          is: (pass) => pass === "Credit" || pass === "Debit",
          then: string(20).required("Digite a senha"),
        }),
      purchasingPower: number(20)
        .required("Adicione Dinheiro!")
        .min(2000)
        .default(2000),
    })
    .noUnknown();

  paymentParams = object()
    .shape({
      id: number().required(),
    })
    .noUnknown();

  loginGoogle = object()
    .shape({
      id: string()
    })
    .noUnknown();
}

module.exports = new FilterYup();
