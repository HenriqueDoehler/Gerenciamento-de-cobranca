import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Close from "../../../images/icons/close.svg";
import iconCheck from "../../../images/icons/iconCheck.svg";
import iconCharges from "../../../images/icons/iconCharges.svg";
import useGlobalContextProvider from "../../../hooks/useGlobalContextProvider";
import api from "../../../services/api";
import "../modal.css";
import "./styles.css";

const AddCharges = ({ setVerAddCharges, detailsClients, closeModal }) => {
  const [formActive, setFormActive] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [valor, setValor] = useState("");
  const [check, setCheck] = useState("");
  const { token } = useGlobalContextProvider();
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      if (!descricao || !vencimento) {
        setFormActive(true);
        return;
      }
      const response = await api.post(
        `/cobranca/${detailsClients.id}`,
        {
          descricao: descricao,
          vencimento: vencimento,
          valor: valor,
          status: check,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status > 202) {
        return;
      }

      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="backdrop">
      <div className="container-modal-add back-modal">
        <div className="close">
          <img src={Close} alt="close" onClick={closeModal} />
        </div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { marginBottom: "13px", width: "379px" },
          }}
          noValidate
          autoComplete="on"
        >
          <div className="icon-title-charges-modal-add">
            <img
              className="icon-charges-title-modal-add"
              src={iconCharges}
              alt="logoEdit"
            />
            <h1 className="title">Cadastro de Cobrança</h1>
          </div>
          <h3 className="label">Nome</h3>
          {
            <TextField
              id="filled-basic"
              size="small"
              variant="outlined"
              value={detailsClients.nome}
            />
          }
          <div>
            <h3 className="label">Descrição*</h3>
            {!formActive ? (
              <textarea
                className="descricao-modal-add"
                name="descrição"
                value={descricao}
                id="email"
                cols="47"
                rows="4"
                placeholder="Digite a descrição"
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              ></textarea>
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
              ></textarea>
            )}
          </div>

          <div className="vencimento-valor-modal-add">
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
              <input type="checkbox" />
              <span
                className={check === true ? "check-verde" : "check-cinza"}
                onClick={() => setCheck(true)}
              >
                <img src={iconCheck} alt="iconCheck" />
              </span>
              <span className="text-modal-edicao-add-cobranca ">
                Cobrança Paga
              </span>
            </label>
          </div>

          <div className="cobranca-paga-cinza">
            <label className="label-check-cinza">
              <input type="checkbox" />
              <span
                className={check === false ? "check-verde" : "check-cinza"}
                onClick={() => {
                  setCheck(false);
                }}
              >
                <img src={iconCheck} alt="iconChek" />
              </span>
              <span className="text-modal-edicao-add-cobranca ">
                Cobrança Pendete
              </span>
            </label>
          </div>

          <div className="btn-charges">
            <Button
              className="btn-charges-cancelar"
              variant="contained"
              color="success"
              type="submit"
              rounded
              onClick={() => setVerAddCharges(false)}
              style={{ textTransform: "none", borderRadius: "8px" }}
            >
              Cancelar
            </Button>
            <Button
              className="btn-charges-aplicar"
              onClick={HandleSubmit}
              variant="contained"
              color="success"
              type="submit"
              rounded
              style={{ textTransform: "none", borderRadius: "8px" }}
            >
              Aplicar
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddCharges;
