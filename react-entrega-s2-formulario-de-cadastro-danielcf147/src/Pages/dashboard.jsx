import { useEffect, useState } from "react";

import api from "../services/api";
const Dashboard = () => {
  const token = localStorage.getItem("@USERID");
  const [user, setUser] = useState(null);

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
            <p className="text1">Que pena! Estamos em desenvolvimento</p>
            <p className="text3">
              Nossa aplicação está em desenvolvimento, em breve teremos
              novidades
            </p>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};
export default Dashboard;
