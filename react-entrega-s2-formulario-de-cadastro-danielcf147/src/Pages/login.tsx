import { useForm } from "react-hook-form";
import Form2 from "../Form/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { schemaLogin } from "../Validators/loginUser";
import { useContext } from "react";
import { IdataLogin, UserContext } from "../Providers/userContext";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdataLogin>({
    resolver: yupResolver(schemaLogin),
  });

  return (
    <div className="container-main">
      <div className="header-login">
        <img className="header-img" src="./icons/logo.png" alt="" />
      </div>
      <div className="login-container">
        <Form2 onSubmit={handleSubmit(loginUser)}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Digite o email"
            {...register("email")}
          />
          <span>{errors.email?.message}</span>

          <label htmlFor="password">Senha</label>
          <input
            type="text"
            id="password"
            placeholder="Digite a senha"
            {...register("password")}
          />
          <span>{errors.password?.message}</span>

          <button className="login-enter" type="submit">
            Entrar
          </button>
        </Form2>
        <div className="span-register">
          <span>Ainda não possue conta?</span>
        </div>
        <Link className="register-p" to="/register">
          <div className="div-register">
            <p>Cadastre-se</p>
          </div>
        </Link>
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
        <ToastContainer />
      </div>
    </div>
  );
};
export default Login;
