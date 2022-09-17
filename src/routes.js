import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import useGlobalContextProvider from "./hooks/useGlobalContextProvider";
import Clients from "./pages/Clients";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Charges from "../src/pages/Charges";
import Register from "./pages/Register/index";

function MainRoutes() {
  const navigate = useNavigate();
  function ProtectedRoutes({ redirectTo }) {
    const { token } = useGlobalContextProvider();
    return token ? <Outlet /> : navigate(redirectTo);
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/usuarios" element={<Register />} />
      <Route element={<ProtectedRoutes redirectTo={"/"} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/charges" element={<Charges />} />
      </Route>
    </Routes>
  );
}
export default MainRoutes;
