import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext); // หรือ logic ของคุณ
  console.log('user:', user)


  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
