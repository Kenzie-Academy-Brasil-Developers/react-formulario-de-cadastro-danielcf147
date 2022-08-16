import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Form3 from "../Form/postDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";
import { schemaTechnology } from "../Validators/technology";
import { UserContext } from "../Providers/userContext";
import Technology from "../Components/tecnology";
const Dashboard = () => {
  const token = localStorage.getItem("@USERID");
  const { postTechnology, userTechs } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaTechnology),
  });
  useEffect(() => {
    api
      .get(`/users/${token}`)
      .then((res) => setUser(res))
      .catch((res) => console.log(res));
  }, []);

  function logout() {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    window.location.reload(false);
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.0)",
    },
    content: {
      width: "369px",
      height: "342px",
      backgroundColor: "#121214",
      boxShadow: "0px 4px 40px -10px rgba(0, 0, 0, 0.25)",
      borderRadius: "4px",
      border: "none",
      padding: "0px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
      {user ? (
        <div className="container-main">
          <div className="header-dashboard">
            <img className="header-img" src="./icons/logo.png" alt="" />
            <button className="logout-btn" onClick={logout}>
              Sair
            </button>
          </div>
          <div className="div-line"></div>
          <div className="user-info">
            <p className="text1">{`Ola, ${user.data.name}`}</p>
            <p className="text2">{user.data.course_module}</p>
          </div>
          <div className="div-line"></div>
          <div className="user-content">
            <div className="user-content-header">
              <h3>Tecnologias</h3>
              <button className="user-content-btn" onClick={openModal}>
                +
              </button>
              <Modal isOpen={modalIsOpen} style={customStyles}>
                <div className="header-modal">
                  <p>Cadastrar Tecnologia</p>
                  <button onClick={closeModal} className="close-btn">
                    X
                  </button>
                </div>
                <Form3 onSubmit={handleSubmit(postTechnology)}>
                  <label htmlFor="title">Nome</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Digite a tecnologia"
                    {...register("title")}
                  />
                  <span>{errors.name?.message}</span>
                  <label htmlFor="status">Selecione um modulo</label>
                  <select name="" id="status" {...register("status")}>
                    <option value={"Iniciante"}>Iniciante</option>
                    <option value={"Intermediario"}>Intermediario</option>
                    <option value={"Avançado"}>Avançado</option>
                  </select>

                  <button type="submit">Cadastrar</button>
                </Form3>
              </Modal>
            </div>
            <div className="user-content-body">
              {userTechs.map((item) => (
                <Technology item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="loading-p">loading (づ｡◕‿‿◕｡)づ</p>
      )}
    </>
  );
};
export default Dashboard;
