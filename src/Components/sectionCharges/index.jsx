import { useEffect, useState } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext.js';
import btnEditCharges from '../../images/icons/btnEditCharges.svg';
import btnExcluirCharges from '../../images/icons/btnExcluirCharges.svg';
import iconCharges from '../../images/icons/iconCharges.svg';
import iconFilter from '../../images/icons/iconFilter.svg';
import iconLupa from '../../images/icons/iconLupa.svg';
import iconOrder from '../../images/icons/iconOrder.svg';
import api from '../../services/api.js';
import { editDate } from '../../utils/helpers';
import ConfirmExcluir from '../Modals/ConfirmExcluir';
import DetailsCharges from '../Modals/DetailsCgarges/index.jsx';
import EditCharges from '../Modals/EditCharges';
import "./styles.css";

function ChargesPage({ identifica }) {

  const [verModalCharges, setVerModalCharges] = useState(false);
  const [confirmExcluir, setConfirmExcluir] = useState(false);
  const [detailsCharges, setDetailsCharges] = useState(false);

  const { token, charges, setCharges } = useGlobalContext();
  useEffect(() => {
    async function getCharges() {
      try {
        const response = await api.get("/cobranca", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status > 202) {
          return
        }

        setCharges([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getCharges()

  }, [setCharges, token]);


  return (
    <div className='container-charges-lister'>
      <div className="title-search">
        <div className="icon-title">
          <img src={iconCharges} alt='icone cobranças black' />
          <h2 className="title-cobranca">Cobranças</h2>
        </div>
        <div className='icons-filter-search'>
          <img className='filter' src={iconFilter} alt='filtro' />
          <input className='pesquisa' type='text' name='pesquisar' placeholder='Pesquisa' />
          <img className='lupa' src={iconLupa} alt='lupa' />
        </div>
      </div>
      <table className='table'>
        <tr className='coluna-cobranca'>
          <th className='item-coluna-1'><img className='order' src={iconOrder} alt='ordenar' />Cliente</th>
          <th className='item-coluna-2'><img className='order' src={iconOrder} alt='ordenar' />ID Cob.</th>
          <th className='item-coluna-3'>Valor</th>
          <th className='item-coluna-4'>Data de venc.</th>
          <th className='item-coluna-5'>Status</th>
          <th className='item-coluna-descricao'>Descrição</th>
          <th className='item-coluna-vazio-btns'></th>
        </tr>
        {
          charges?.map((dados) => {
            return (
              <tr className='linha' key={dados?.id}>
                <td
                  className='item-linha-1 details-charges'
                  onClick={() => setDetailsCharges(!detailsCharges)}
                >
                  {dados?.cliente_nome}
                </td>
                <td
                  className='item-linha-2 details-charges'
                  onClick={() => setDetailsCharges(!detailsCharges)}
                >
                  {dados?.id}
                </td>
                <td
                  className='item-linha-3 details-charges'
                  onClick={() => setDetailsCharges(!detailsCharges)}
                >
                  R$ {dados?.valor}
                </td>
                <td
                  className='item-linha-4 details-charges'
                  onClick={() => setDetailsCharges(!detailsCharges)}
                >
                  {editDate(dados?.vencimento)}
                </td>
                <td
                  className={dados?.status === 'Paga' ? 'item-status-charges-paga' : dados?.status === 'Pendente' ? 'item-status-charges-pendente' : 'item-status-charges-vencida'}
                  onClick={() => setDetailsCharges(!detailsCharges)}
                >
                  {dados?.status}
                </td>
                <td
                  className='item-linha-descricao details-charges'
                  onClick={() => setDetailsCharges(!detailsCharges)}
                >
                  {dados?.descricao}
                </td>
                <td className='item-linha-btns'>
                  <img
                    className='edit-icon icons-charges'
                    src={btnEditCharges}
                    alt='editar cobranças'
                    onClick={() => setVerModalCharges(!verModalCharges)}
                  />
                  <img
                    className='icons-charges'
                    src={btnExcluirCharges}
                    alt='excluir cobranças'
                    onClick={() => setConfirmExcluir(!confirmExcluir)}
                  />
                </td>
              </tr>
            )
          })
        }
        {
          verModalCharges && <EditCharges setVerModalCharges={setVerModalCharges} />
        }
        {
          confirmExcluir && <ConfirmExcluir setConfirmExcluir={setConfirmExcluir} />
        }
        {
          detailsCharges && <DetailsCharges setDetailsCharges={setDetailsCharges} />
        }
      </table >
    </div >
  );
}

export default ChargesPage;
