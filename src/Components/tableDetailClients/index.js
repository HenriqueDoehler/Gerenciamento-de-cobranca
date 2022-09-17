
import "./styles.css";

function TableClientsDetail({ detailsClients }) {
 
  return (
    <div className="tableDetailsClientsCharger-container">
      <div className="div-titulo">
        <h1>Dados do cliente</h1>
        <button className="btn-editClients">Editar cliente</button>
      </div>
      
      <tr className="tableDetailsClientsCharger-header">
        <th>
          E-mail*
        </th>
        <th>
          Telefone*
        </th>
        <th>CPF</th> 
      </tr>

      <tr className="table-contentDetails">
            <td>{detailsClients?.email}</td>
            <td>{detailsClients?.telefone}</td>
            <td>{detailsClients.cpf}</td>
          </tr>
       <tr className="tableDetailsClientsCharger-header">
       <th>
          Endereço
        </th>
        <th>
          Bairro
        </th>
        <th>Complemento</th> 
        <th>CEP</th> 
        <th>Cidade</th> 
        <th>UF</th> 
       </tr>
     
        <div className="div-map">
          <tr className="table-contentDetails">
            <td>{detailsClients?.logradouro}</td>
            <td>{detailsClients?.bairro}</td>
            <td>{detailsClients.complemento}</td>
            <td className="th-td-spacing-Detailsclients">{detailsClients?.cep}</td>
            <td className="th-td-spacing-clientsDetails">{detailsClients.cidade}</td>
            <td className="th-td-spacing-clientsDetails">
              {detailsClients.estado}
            </td>
          </tr>
        </div>
     
    </div>
  );
}
export default TableClientsDetail;
