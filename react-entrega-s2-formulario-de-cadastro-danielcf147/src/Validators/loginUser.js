import * as yup from "yup";
export const schemaLogin = yup.object({
  email: yup
    .string()
    .email("deve ser um email")
    .required("O email é obrigatorio!"),
  password: yup.string().required("A senha é obrigatoria!"),
});
