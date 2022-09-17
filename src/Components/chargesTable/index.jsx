import { Link } from "react-router-dom";
import "./styles.css";

function ChargesTable({ title, color, arrayDataClients }) {
  const chargesObjectLength = arrayDataClients?.charges?.length;
  const chargesObjectSliced = arrayDataClients?.charges?.slice(
    chargesObjectLength - 4 === -1 ? 0 : chargesObjectLength - 4
  );
  return (
    <div className="cardCharges">
      <div className="title-charge">
        <h3>{title}</h3>
        <div
          className={
            color === "red"
              ? "number-charges number-red"
              : color === "yellow"
              ? "number-charges number-yellow"
              : "number-charges number-blue"
          }
        >
          <span>{arrayDataClients?.count}</span>
        </div>
      </div>

      <div className="container-table">
        <table style={{ width: "99%" }}>
          <thead>
            <tr className="table-head">
              <th>Cliente</th>

              <th>ID da Cob.</th>
              <th>Valor </th>
            </tr>
          </thead>
          <tbody>
            {chargesObjectSliced?.map((client) => (
              <tr className="table-row" key={client.id}>
                <th>{client.cliente_nome}</th>
                <th>{client.id}</th>
                <th>{client.valor}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer-charge">
        <Link to="/charges">Ver todos</Link>
      </div>
    </div>
  );
}

export default ChargesTable;
