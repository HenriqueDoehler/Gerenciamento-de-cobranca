import { useEffect, useState } from "react";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import AntecipatedChargesIcon from "../../images/icons/anticipatedChargeIcons.svg";
import ChargePaidIcon from "../../images/icons/chargesPaidIcon.svg";
import OverdueChargesIcon from "../../images/icons/overdueChargesIcon.svg";
import api from "../../services/api";
import ChargesTable from "../chargesTable";
import ClientsTable from "../clientsTable";
import HeaderGlobal from "../header";
import SideMenu from "../menu";
import "./styles.css";

function HomePage() {
  const [clientsArray, setClientsArray] = useState({
    paidDatas: {},
    antecipatedDatas: {},
    overdueDatas:{},
  });
  const { token } = useGlobalContextProvider();

  useEffect(() => {
    async function loadClients() {
      try {
        const response = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) {
          return;
        }

        setClientsArray({
          paidDatas: response.data.chargesPaid,
          antecipatedDatas: response.data.chargesOutstanding,
          overdueDatas: response.data.chargesOverdue,
        });
      } catch (error) {
        console.log(error);
      }
    }
    loadClients();
  }, [token]);

  return (
    <>
      <SideMenu />
      <div className="homePage-container">
        <HeaderGlobal titlePage={"Resumo das Cobranças"} />

        <div className="homePage-resume">
          <div className="boxes-resume bc-secondary">
            <img src={OverdueChargesIcon} alt="Ícone de Cobranças Vencidas" />
            <div className="homePage-resume-date">
              <h2>Cobranças Vencidas</h2>
              <span>R$ {clientsArray.overdueDatas.amount?clientsArray.overdueDatas.amount:"0"}</span>
            </div>
          </div>

          <div className="boxes-resume bc-tertiary">
            <img
              src={AntecipatedChargesIcon}
              alt="Ícone de Cobranças Previstas"
            />
            <div className="homePage-resume-date">
              <h2>Cobranças Previstas</h2>
              <span>R$ {clientsArray.antecipatedDatas.amount?clientsArray.antecipatedDatas.amount:"0"}</span>
            </div>
          </div>

          <div className="boxes-resume bc-primary">
            <img src={ChargePaidIcon} alt="Ícone de Cobranças Pagas" />
            <div className="homePage-resume-date">
              <h2>Cobranças Pagas</h2>
              <span>R$ {clientsArray.paidDatas.amount?clientsArray.paidDatas.amount:"0"}</span>
            </div>
          </div>          
        </div>

        <div className="container-charges">
          <ChargesTable 
          title={"Cobranças Vencidas"} 
          color={"red"} 
          arrayDataClients={clientsArray.overdueDatas}
          />
          <ChargesTable 
          title={"Cobranças Previstas"} 
          color={"yellow"} 
          arrayDataClients={clientsArray.antecipatedDatas}
          />
          <ChargesTable 
          title={"Cobranças Pagas"} 
          color={"blue"} 
          arrayDataClients={clientsArray.paidDatas}
          />
        </div>

        <div className="container-status-clients">
          <ClientsTable 
          title={"Clientes Inadimplentes"} 
          color={"red"} 
          route={"/clientes-inadimplentes"}
          />
          <ClientsTable 
          title={"Clientes em dia"} 
          color={"blue"} 
          route={"/clientes-adimplentes"}
          />
        </div>
      </div>
    </>
  );
}
export default HomePage;
