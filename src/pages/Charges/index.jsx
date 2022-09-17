import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderGlobal from "../../Components/header";
import SideMenu from "../../Components/menu";
import SectionCharges from '../../Components/sectionCharges';
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import "./styles.css";

function Charges() {
  const { token } = useGlobalContextProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <>
      <SideMenu />
      <div className="charges-container">
        <HeaderGlobal titlePage={"Clientes"} />
        <SectionCharges />
      </div>
    </>
  );
}
export default Charges;
