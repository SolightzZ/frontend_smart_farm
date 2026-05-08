import { Outlet } from "react-router-dom";

function useAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn:", isLoggedIn);
  if (!isLoggedIn) {
    window.location.href = "/login";
  }

  return <Outlet />;
}

export default useAuth;
