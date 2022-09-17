import { Box, Button } from "@mui/material";
import Close from "../../../images/icons/close.svg";
import iconWarning from "../../../images/icons/iconWarning.svg";
import api from "../../../services/api";
import useGlobalContextProvider from "../../../hooks/useGlobalContextProvider";
import PopUps from "../../PopUps/actionStatusPopUp/index";
import { useState } from "react";

import "../modal.css";
import "./styles.css";

const ConfirmExcluir = ({
  setConfirmExcluir,
  closeModal,
  detailsClientsCharges,
}) => {
  const [popUpActive, setPopUpActive] = useState();
  const { token } = useGlobalContextProvider();
  console.log(detailsClientsCharges);
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.delete(
        `/cobranca/${detailsClientsCharges.id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status > 202) {
        return;
      }
      setPopUpActive(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="backdrop">
      {popUpActive && (
        <PopUps status={"sucess"} message={"Cobrança excluida"} />
      )}

      <div className="container-modal-confirm-excluir back-modal">
        <div className="close-confirm-excluir">
          <img
            src={Close}
            alt="close"
            onClick={() => {
              closeModal();
            }}
          />
        </div>
        <Box component="form" noValidate autoComplete="on">
          <img className="icon-warning" src={iconWarning} alt="logo-warning" />

          <h1 className="title-warning">
            Tem certeza que deseja excluir esta cobrança?
          </h1>

          <div className="div-warning-btn">
            <Button
              className="btn-warning-nao"
              variant="contained"
              color="success"
              type="submit"
              rounded
              onClick={() => setConfirmExcluir(false)}
            >
              Não
            </Button>
            <Button
              className="btn-wirning-sim"
              variant="contained"
              color="success"
              type="submit"
              rounded
              onSubmit={HandleSubmit}
              onClick={() => {
                setPopUpActive(true);
              }}
            >
              Sim
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ConfirmExcluir;
