import { useEffect } from "react";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import cobrança from "../../images/icons/cobrança.svg";
import emDia from "../../images/icons/emDia.svg";
import IconOrder from "../../images/icons/iconOrder.svg";
import inadimplente from "../../images/icons/Inadimplente.svg";
import api from "../../services/api";
import AddCharges from '../Modals/AddCharges';
import "./styles.css";

function TableClients({ setDetailsClients, setActiveTableToggle, verAddCharges, setVerAddCharges }) {
  const { token, clients, setClients, activeTableToggle } =
    useGlobalContextProvider();

  useEffect(() => {
    async function getClients() {
      try {
        const response = await api.get("/cliente", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 202) {
          return;
        }

        setClients([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    getClients();
  }, [setClients, token]);

  return (
    <>
    <table>
      <div className="tableClients-container">
        <thead>
          <tr className="table-header">
            <th>
              <img src={IconOrder} alt="Ícone de Ordernação por nome" />
              Cliente
            </th>
            <th>CPF</th>
            <th>E-mail</th>
            <th className="th-td-spacing-clients">Telefone</th>
            <th className="th-td-spacing-clients">Status</th>
            <th className="th-td-spacing-clients">Criar cobrança</th>
          </tr>
        </thead>
        {clients.map((clients) => (
          <tbody>
            <tr className="table-content" key={clients?.id}>
              <td onClick={()=>{setDetailsClients(clients) 
                setActiveTableToggle(!activeTableToggle)}}>{clients?.nome}</td>
              <td>{clients?.cpf}</td>
              <td>{clients?.email}</td>
              <td className="th-td-spacing-clients">{clients?.telefone}</td>
              <td className="th-td-spacing-clients">
                {(clients.status === "Em dia" && <img src={emDia} alt="em dia" />)}
                {
                  (clients.status === "Inadimplente" && (
                    <img src={inadimplente} alt="em dia" />
                    ))
                  }
              </td>
              <td className="th-td-spacing-clients">
                <img
                  className="btn-charges-client"
                  src={cobrança}
                  alt="cobrança"
                  onClick={() => setVerAddCharges(!verAddCharges)}
                  />
              </td>
            </tr>
          </tbody>
        ))}
      </div>
      {verAddCharges && <AddCharges setVerAddCharges={setVerAddCharges} />}
    </table>
    </>
  );
}
export default TableClients;
