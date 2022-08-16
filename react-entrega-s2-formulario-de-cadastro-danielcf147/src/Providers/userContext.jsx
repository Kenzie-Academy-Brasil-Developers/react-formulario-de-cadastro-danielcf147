import { createContext, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export const UserContext = createContext({});

export const Provider = ({ children }) => {
  const userIdValue = localStorage.getItem("@USERID");
  const [userId, setUserId] = useState(userIdValue);
  const [userTechs, setUserTechs] = useState([]);
  const workingLogin = () => {
    toast.success("Sucesso!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notWorkingLogin = () => {
    toast.error("Login invalido!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function timeout() {
    window.location.reload(false);
  }
  function loginUser(data) {
    api
      .post("/sessions", data)
      .then((res) => {
        localStorage.setItem("@TOKEN", res.data.token);
        localStorage.setItem("@USERID", res.data.user.id);
        setUserId(res.data.user.id);
        workingLogin();
        setTimeout(timeout, 2000);
      })
      .catch((res) => {
        notWorkingLogin();
      });
  }
  const workingRegister = () => {
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
  const notWorkingRegister = () => {
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

  function redirect() {
    window.location.href = "../Pages/login";
  }
  function registerUser(data) {
    api
      .post("/users", data)
      .then((res) => {
        workingRegister();
        setTimeout(redirect, 3000);
      })
      .catch((res) => {
        notWorkingRegister();
      });
  }

  function postTechnology(data) {
    api.post("/users/techs", data).then((res) => setUserId(res.data.id));
  }
  useEffect(() => {
    if (userId !== null) {
      api.get(`/profile`).then((res) => setUserTechs(res.data.techs));
    }
  }, [userId]);
  return (
    <UserContext.Provider
      value={{ loginUser, registerUser, postTechnology, userTechs }}
    >
      {children}
    </UserContext.Provider>
  );
};
