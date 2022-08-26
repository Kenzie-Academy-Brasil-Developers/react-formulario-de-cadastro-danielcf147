import { createContext, useState, ReactNode } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { login } from "../services/loginUser";
import { technology } from "../services/postTechnology";
import { techs } from "../services/profile";
import { SubmitHandler } from "react-hook-form";

export interface IdataLogin {
  email: string;
  password: string;
}
export interface IdataRegister {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
  bio: string;
  contact: string;
  course_module: string;
}
export interface IdataPostTechnology {
  title: string;
  status: string;
}
interface IdataTechs {
  title: string;
  status: string;
  id: string;
}
interface IuserListProps {
  children: ReactNode;
}
interface IuserContext {
  loginUser: (data: IdataLogin) => void;
  registerUser: (data: IdataRegister) => void;
  postTechnology: (data: IdataPostTechnology) => void;
  userTechs: IdataTechs[];
}

export const UserContext = createContext<IuserContext>({} as IuserContext);

export const Provider = ({ children }: IuserListProps) => {
  const userIdValue = localStorage.getItem("@USERID");
  const [userId, setUserId] = useState(userIdValue);
  const [userTechs, setUserTechs] = useState<IdataTechs[]>([]);
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
    window.location.reload();
  }
  const loginUser: SubmitHandler<IdataLogin> = (data) => {
    login(data)
      .then((res) => {
        localStorage.setItem("@TOKEN", res.token);
        localStorage.setItem("@USERID", res.user.id);
        api.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
        setUserId(res.user.id);
        workingLogin();
        setTimeout(timeout, 2000);
      })
      .catch((res) => {
        notWorkingLogin();
      });
  };
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
  const registerUser: SubmitHandler<IdataRegister> = (data) => {
    api
      .post("/users", data)
      .then((res) => {
        workingRegister();
        setTimeout(redirect, 3000);
      })
      .catch((res) => {
        notWorkingRegister();
      });
  };

  const postTechnology: SubmitHandler<IdataPostTechnology> = (data) => {
    technology(data).then((res) => setUserId(res.id));
  };
  useEffect(() => {
    if (userId !== null) {
      techs().then((res) => setUserTechs(res.techs));
      // api.get(`/profile`).then((res) => setUserTechs(res.data.techs));
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
