import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/login";
import Resgister from "../Pages/register";
import Dashboard from "../Pages/dashboard";

const RoutesMain = () => {
  const token = localStorage.getItem("@TOKEN");
  return (
    <>
      {token === null ? (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
    </>
  );
};
export default RoutesMain;
