import { useForm } from "react-hook-form";
import Form2 from "../Form/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../services/api";
import { schemaLogin } from "../Validators/loginUser";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });
  // useEffect(() => {
  //   api.post("/users",{}).then((res) => console.log(res));
  // }, []);

  function registerUser(data) {
    api.post("/sessions", data).then((res) => {
      localStorage.setItem("@TOKEN", res.data.token);
      localStorage.setItem("@USERID", res.data.user.id);
      window.location.reload(false);
      console.log(res);
    });
    console.log(data);
  }

  return (
    <div className="container-main">
      <div className="header-login">
        <img className="header-img" src="./icons/logo.png" alt="" />
      </div>
      <div className="login-container">
        <Form2 onSubmit={handleSubmit(registerUser)}>
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
      </div>
    </div>
  );
};
export default Login;
