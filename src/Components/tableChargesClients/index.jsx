import { useEffect } from "react";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import btnEdit from "../../images/icons/btnEditCharges.svg";
import btnDelete from "../../images/icons/btnExcluirCharges.svg";
import IconOrder from "../../images/icons/iconOrder.svg";
import vencidaIcon from "../../images/icons/Vencidaicon.svg";
import pagaIcon from "../../images/icons/Pagaicon.png";
import previstaIcon from "../../images/icons/Previstaicon.svg";
import api from "../../services/api";
import { editDate } from "../../utils/helpers";
import EditCharges from "../Modals/AddCharges/index";
import "./styles.css";
import ConfirmExcluir from "../Modals/ConfirmExcluir/index";

function TableClientsCharger({
  detailsClients,
  setDetailsClientsCharges,
  detailsClientsCharges,
}) {
  const {
    token,
    clientsCharge,
    setClientsCharges,
    openModalAddCharges,
    setOpenModalAddCharges,
    modalActive,
    setModalActive,
  } = useGlobalContextProvider();

  useEffect(() => {
    async function getClients() {
      try {
        const response = await api.get(
          `/cobranca/cliente/${detailsClients.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status > 202) {
          return;
        }
        setClientsCharges([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    getClients();

    openModalAddCharges && getClients();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {modalActive && (
        <ConfirmExcluir
          detailsClientsCharges={detailsClientsCharges}
          closeModal={() => setModalActive(false)}
        />
      )}
      {openModalAddCharges && (
        <EditCharges
          closeModal={() => setOpenModalAddCharges(false)}
          detailsClients={detailsClients}
        />
      )}

      <div className="tableClientsCharger-container">
        <div className="div-titulo">
          <h1>Cobranças do cliente</h1>
          <button
            className="btn-add-chargesC"
            onClick={() => {
              setOpenModalAddCharges(true);
            }}
          >
            + Nova cobrança
          </button>
        </div>
        <tr className="tableClientsCharger-header">
          <th>
            <img src={IconOrder} alt="Ícone de Ordernação por nome" />
            ID cobrança
          </th>
          <th>
            <img src={IconOrder} alt="Ícone de Ordernação por nome" />
            Data de venc.
          </th>
          <th>Valor</th>
          <th>Status</th>
          <th>Descriçao</th>
        </tr>
        {clientsCharge.map((clients) => (
          <div className="div-map">
            <tr className="table-content">
              <td>{clients?.id}</td>
              <td>{editDate(clients?.vencimento)}</td>

              <td>{clients?.valor}</td>
              <td className="th-td-spacing-clientsD">
                {clients?.status === "Paga" && <img src={pagaIcon} alt="" />}
                {clients?.status === "Pendente" && (
                  <img src={previstaIcon} alt="" />
                )}
                {clients?.status === "Vencida" && (
                  <img src={vencidaIcon} alt="" />
                )}
              </td>
              <td className="th-td-spacing-clientsD">{clients?.descricao}</td>
              <td className="th-td-spacing-clientsD1">
                <img className="btn-chargesD" src={btnEdit} alt="cobrança" />
                <img
                  className="btn-chargesD"
                  src={btnDelete}
                  key={clients.id}
                  onClick={() => {
                    console.log(clients);
                    setDetailsClientsCharges(clients);
                    setModalActive(true);
                  }}
                  alt="cobrança"
                />
              </td>
            </tr>
          </div>
        ))}
      </div>
    </>
  );
}
export default TableClientsCharger;
