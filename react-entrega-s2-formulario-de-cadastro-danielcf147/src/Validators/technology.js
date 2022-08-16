import * as yup from "yup";
export const schemaTechnology = yup.object({
  title: yup.string().required("O titulo é obrigatorio!"),
});
