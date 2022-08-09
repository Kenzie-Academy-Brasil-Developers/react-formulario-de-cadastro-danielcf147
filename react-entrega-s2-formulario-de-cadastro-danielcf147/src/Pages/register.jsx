import { useForm } from "react-hook-form";
import Form from "../Form/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { schema } from "../Validators/registerUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const working = () => {
    toast.success("Usuario criado com sucesso!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notWorking = () => {
    toast.error("Email ja existe!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const navigate = useNavigate();
  function navigating() {
    navigate("/login", { replace: true });
  }
  function registerUser(data) {
    api
      .post("/users", data)
      .then((res) => {
        working();
        setTimeout(navigating, 3000);
      })
      .catch((res) => {
        notWorking();
      });
  }
  return (
    <div className="container-main">
      <div className="header-register">
        <img className="header-img" src="./icons/logo.png" alt="" />
        <button
          className="back-btn"
          onClick={() => navigate("/login", { replace: true })}
        >
          Voltar
        </button>
      </div>
      <div className="form-container">
        <Form onSubmit={handleSubmit(registerUser)}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Digite aqui o seu nome"
            {...register("name")}
          />
          <span>{errors.name?.message}</span>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Digite aqui o seu email"
            {...register("email")}
          />
          <span>{errors.email?.message}</span>

          <label htmlFor="password">Senha</label>
          <input
            type="text"
            id="password"
            placeholder="Digite aqui a sua senha"
            {...register("password")}
          />
          <span>{errors.password?.message}</span>

          <label htmlFor="confirmationPassword">Confirmar senha</label>
          <input
            type="text"
            id="confirmationPassword"
            placeholder="Digite aqui novamente a sua senha"
            {...register("confirmationPassword")}
          />
          <span>{errors.confirmationPassword?.message}</span>

          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            placeholder="Fale sobre você"
            {...register("bio")}
          />

          <label htmlFor="contact">Contato</label>
          <input
            type="text"
            id="contact"
            placeholder="Opção de contato"
            {...register("contact")}
          />
          <span>{errors.contact?.message}</span>

          <label htmlFor="course_module">Selecione um modulo</label>
          <select name="" id="course_module" {...register("course_module")}>
            <option value={"Primeiro Módulo (Frontend basico)"}>
              Primeiro modulo
            </option>
            <option value={"Segundo Módulo (Frontend avançado)"}>
              Segundo modulo
            </option>
            <option value={"Terceiro Módulo (React)"}>Terceiro modulo</option>
            <option value={"Quarto Módulo (Backend basico)"}>
              Quarto modulo
            </option>
            <option value={"Quinto Módulo (Backend avançado)"}>
              Quinto modulo
            </option>
            <option value={"Segundo Módulo (Empregabilidade)"}>
              Sexto modulo
            </option>
          </select>

          <button type="submit">Cadastrar</button>
        </Form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};
export default Register;
