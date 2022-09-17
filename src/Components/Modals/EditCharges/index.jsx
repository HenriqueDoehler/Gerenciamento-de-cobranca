import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import useGlobalContext from "../../../hooks/useGlobalContext";
import Close from "../../../images/icons/close.svg";
import iconCharges from '../../../images/icons/iconCharges.svg';
import iconCheck from '../../../images/icons/iconCheck.svg';
import api from '../../../services/api.js';
import "../modal.css";
import "./styles.css";


const EditCharges = ({ setVerModalCharges }) => {
  const [formActive] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [valor, setValor] = useState("");
  const [check, setCheck] = useState('pendente');


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
          console.log('ver', charges);
          return
        }

        setCharges([...response.data]);

      } catch (error) {
        console.log(error)
      }
    }
    getCharges()
  }, [charges, setCharges, token]);

  return (
    <div className="backdrop">
      <div className="container-modal-edit back-modal">
        <div className="close-edit-modal">
          <img
            src={Close}
            alt="close"
            onClick={() => setVerModalCharges(false)}
          />
          { }
        </div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { marginBottom: "13px", width: "379px" },
          }}
          noValidate
          autoComplete="on"
        >
          <div className="icon-title-charges">
            <img className="icon-charges-title" src={iconCharges} alt='logoEdit' />
            <h1 className="title">Edição de Cobrança</h1>
          </div>


          <h3 className="label">Nome</h3>
          {
            <TextField
              id="filled-basic"
              size="small"
              variant="outlined"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
          }
          <div>
            <h3 className="label">Descrição*</h3>
            {!formActive ? (
              <textarea
                className="descricao"
                name="descrição"
                value={descricao}
                id="email"
                cols="47"
                rows="4"
                placeholder="Digite a descrição"
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              >
              </textarea>
            ) : (
              <textarea
                className="descricao"
                name="descrição"
                id="email"
                cols="47"
                rows="4"
                placeholder="Digite a descrição"
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
                helperText="Este campo deve ser preenchido"
                variant="outlined"
              >
              </textarea>
            )
            }
          </div>

          <div className="vencimento-valor">
            <div className="vencimento-charges">
              <h3 className="label">Vencimento:*</h3>
              {!formActive ? (
                <TextField
                  id="filled-basic"
                  size="small"
                  label="Digite o Status"
                  type="text"
                  variant="outlined"
                  value={vencimento}
                  onChange={(e) => {
                    setVencimento(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  size="small"
                  error
                  id="filled-error-helper-text"
                  label="Error"
                  type="text"
                  value={vencimento}
                  onChange={(e) => {
                    setVencimento(e.target.value);
                  }}
                  helperText="Este campo deve ser preenchido"
                  variant="outlined"
                />
              )}
            </div>
            <div className="valor-charges">
              <h3 className="label">Valor:*</h3>
              {!formActive ? (
                <TextField
                  id="filled-basic"
                  size="small"
                  label="Digite o valor"
                  type="text"
                  variant="outlined"
                  value={valor}
                  onChange={(e) => {
                    setValor(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  size="small"
                  error
                  id="filled-error-helper-text"
                  label="Este campo deve ser preenchido"
                  type="text"
                  value={valor}
                  onChange={(e) => {
                    setValor(e.target.value);
                  }}
                  helperText="Este campo deve ser preenchido"
                  variant="outlined"
                />
              )}
            </div>
          </div>
          <br />

          <h3 className="label">Status:*</h3>
          <div className="cobranca-paga-verde">
            <label className="label-check-verde">
              <input type='checkbox' />
              <span
                className={check === 'pago' ? 'check-verde' : 'check-cinza'}
                onClick={() => setCheck('pago')}
              >
                <img src={iconCheck} alt='check' />
              </span>
              <span className="text-modal-edicao-add-cobranca ">Cobrança Paga</span>

            </label>
          </div >

          <div className="cobranca-paga-cinza">
            <label className="label-check-cinza">
              <input type='checkbox' />
              <span

                className={check === 'pendente' ? 'check-verde' : 'check-cinza'}
                onClick={() => setCheck('pendente')}
              >
                <img src={iconCheck} alt='ckeck' />
              </span>
              <span className="text-modal-edicao-add-cobranca ">Cobrança Pendete</span>

            </label>
          </div >

          <div className="btn-charges-add">
            <Button
              className="btn-charges-cancelar"
              variant="contained"
              color="success"
              type="submit"
              rounded
              onClick={() => setVerModalCharges(false)}
              style={{ textTransform: "none", borderRadius: "8px" }}
            >
              Cancelar
            </Button>
            <Button
              className="btn-charges-aplicar"
              variant="contained"
              color="success"
              type="submit"
              rounded
              style={{ textTransform: "none", borderRadius: "8px" }}
            >
              Aplicar
            </Button>
          </div>
        </Box >
      </div >
    </div >
  );
};

export default EditCharges;
