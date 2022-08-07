import * as yup from "yup";
export const schema = yup.object({
  name: yup.string().required("O nome é obrigatorio!"),
  email: yup
    .string()
    .email("deve ser um email")
    .required("O email é obrigatorio!"),
  password: yup
    .string()
    .min(8, "No minimo 8 caracteres")
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Deve conter ao menos uma letra maiuscula e um caracter especial"
    ),
  confirmationPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas devem ser as mesmas"),
  bio: yup.string().required("Bio obrigatoria!"),
  contact: yup
    .string()
    .required()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      "errou"
    ),
});
