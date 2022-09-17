import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import ClientsInDayIcon from "../../images/icons/clientsInDayIcon.svg";
import ClientsPendingIcon from "../../images/icons/clientsPendingIcon.svg";
import api from "../../services/api";
import "./styles.css";

function ClientsTable({ title, color, route}) {
  const [clientsArray, setClientsArray] = useState([]);
  const chargesObjectLength = clientsArray?.length;
  const chargesObjectSliced = clientsArray?.slice(chargesObjectLength-4===-1?0:chargesObjectLength-4);
  const { token } = useGlobalContextProvider();
  useEffect(()=>{
    async function loadClients() {
      try {
        const response = await api.get(route, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) {
          return;
        }
        setClientsArray([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    loadClients()
  },[route, token])

  return (
    <div className="cardClients">
      <div className="title-clients">
        <div className="title-image">
          <img
            src={`${color === "red" ? ClientsPendingIcon : ClientsInDayIcon}`}
            alt="status do Cliente"
          />
          <h3>{title}</h3>
        </div>
        <div
          className={
            color === "red"
              ? "number-clients number-red"
              : color === "yellow"
              ? "number-clients number-yellow"
              : "number-clients number-blue"
          }
        >
          <span>{chargesObjectLength}</span>
        </div>
      </div>

      <div className="container-table-clients">
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="table-head-clients">
              <th>Clientes</th>
              <th className="th-middle">ID do Clie.</th>
              <th>CPF</th>
            </tr>
          </thead>
          <tbody>
            {chargesObjectSliced?.map((client) => (
              <tr className="table-row-clients" key={client.id}>
                <th>{client.nome}</th>
                <th className="th-middle">{client.id}</th>
                <th>{client.cpf}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer-charge-clients">
        <Link to="/clients">Ver todos</Link>
      </div>
    </div>
  );
}

export default ClientsTable;
