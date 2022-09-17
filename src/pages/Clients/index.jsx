import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableClientsCharger from "../../Components/tableChargesClients/index";
import TableClientsDetail from "../../Components/tableDetailClients/index";
import HeaderGlobal from "../../Components/header";
import SideMenu from "../../Components/menu";
import RegisterModals from "../../Components/Modals/RegisterModals/index";
import TableClients from "../../Components/tableClients";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import clientesI from "../../images/icons/clientesicon.svg";
import filter from "../../images/icons/filter.svg";
import SearchIcon from "../../images/icons/search.svg";
import iconCLients from "../../images/icons/iconNameClients.svg";
import "./styles.css";

function Clients() {
  const [detailsClients, setDetailsClients] = useState("");
  const [detailsClientsCharges, setDetailsClientsCharges] = useState("");
  const {
    token,
    addClientes,
    setAddClientes,
    activeTableToggle,
    setActiveTableToggle,
  } = useGlobalContextProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <>
      <SideMenu />
      {!activeTableToggle ? (
        <div className="clients-container">
          <HeaderGlobal titlePage={"Clientes"} />
          <div className="container-up-table">
            <h1 className="clientes-text">
              <img src={clientesI} alt="Ícone de Clientes" /> Clientes
            </h1>

            <button
              className="add-client-button"
              onClick={() => setAddClientes(true)}
              type="button"
            >
              + Adicionar Cliente
            </button>

            <img className="btn-filter-clients" src={filter} alt="filtro" />

            <div className="container-search-clients">
              <input placeholder="Pesquisa"></input>
              <img src={SearchIcon} alt="Ícone de Pesquisa" />
            </div>
          </div>
          <div>
            <TableClients
              setDetailsClients={setDetailsClients}
              setActiveTableToggle={setActiveTableToggle}
            />
            {addClientes && (
              <RegisterModals
                setAddClientes={setAddClientes}
                closeModal={() => setAddClientes(false)}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="clients-container">
          <HeaderGlobal
            titlePage={"Clientes"}
            subtitlePage={"Detalhes do cliente"}
          />
          <div className="clientsName-text">
            <img src={iconCLients} alt="" />
            <h1 className="text-clients-div">{detailsClients.nome}</h1>
          </div>
          <TableClientsDetail detailsClients={detailsClients} />
          <TableClientsCharger
            setDetailsClientsCharges={setDetailsClientsCharges}
            detailsClientsCharges={detailsClientsCharges}
            detailsClients={detailsClients}
          />
        </div>
      )}
    </>
  );
}
export default Clients;
