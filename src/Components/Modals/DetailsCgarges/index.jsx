import { Box } from "@mui/material";
import { useEffect } from "react";
import useGlobalContext from '../../../hooks/useGlobalContext.js';
import Close from "../../../images/icons/close.svg";
import iconCharges from '../../../images/icons/iconCharges.svg';
import api from '../../../services/api.js';
import { editDate } from '../../../utils/helpers.js';
import "../modal.css";
import "./styles.css";


const DetailsCharges = ({ setDetailsCharges }) => {

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
      } catch (error) {
        console.log(error)
      }
    }
    getCharges()

  }, [setCharges, token]);


  return (
    <div className="backdrop">
      <div className="container-modal-details-charges back-modal">
        <div className="close-details-charges">
          <img
            src={Close}
            alt="close"
            onClick={() => setDetailsCharges(false)}
          />
          { }
        </div>
        <Box
          component="form"
          noValidate
          autoComplete="on"
        >
          {
            charges.map((dados) => {
              return (
                <div key={dados.id}>
                  <div className="icon-title-charges-modal-details">
                    <img src={iconCharges} alt='logoEdit' />
                    <h1 className="title-modals">Detalhes da Cobrança</h1>
                  </div>
                  <div className="name-details">
                    <label className='label-details'>Nome</label>
                    <imput className='input-details' type='tetxt'>{dados?.cliente_nome}</imput>
                  </div>
                  <div className="descricao-details">
                    <label className='label-details'></label>
                    <textarea
                      className='textarea-details'
                      name="descrição"
                      id="id"
                      cols="50"
                      rows="4"
                      placeholder="Digite a descrição"
                    >
                      {dados?.descricao}
                    </textarea>
                  </div>
                  <div className="vencimento-valor-details">
                    <div className="div-vencimento">
                      <label className='label-details'>Vencimento</label>
                      <imput className='input-details' type='tetxt'>{editDate(dados?.vencimento)}</imput>
                    </div>
                    <div className="div-valor">
                      <label className='label-details'>Valor</label>
                      <imput className='input-details' type='tetxt'>R$ {dados?.valor / 100}</imput>
                    </div>
                  </div>
                  <div className="div-id-status-details">
                    <div className="div-id-cobranca"
                      identifica={dados?.id}
                    >
                      <label className='label-details'>ID Cobranças</label>
                      <imput className='input-details' type='tetxt'>{dados?.id}</imput>
                    </div>
                    <div className="div-status">
                      <label className='label-details'>Status</label>
                      <imput
                        className={dados?.status === 'Paga' ? 'item-status-charges-paga-details' : dados?.status === 'Pendente' ? 'item-status-charges-pendente-details' : 'item-status-charges-vencida-details'}
                        type='tetxt'>
                        {dados?.status}
                      </imput>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </Box>
      </div>
    </div>
  );
};

export default DetailsCharges;
