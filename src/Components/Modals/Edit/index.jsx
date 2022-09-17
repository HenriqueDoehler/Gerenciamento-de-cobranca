import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userGlobalContextProvider from "../../../hooks/useGlobalContextProvider";
import Close from "../../../images/icons/close.svg";
import api from "../../../services/api";
import "../modal.css";
import "./styles.css";

const EditModal = ({ editProfileModal, setEditProfileModal }) => {
  const { token } = userGlobalContextProvider();
  const [formActive, setFormActive] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get("/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 202) {
          return;
        }
        setNome(response.data.nome)
        setEmail(response.data.email)
        setTelefone(response.data.telefone)
        setCpf(response.data.cpf)
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [token, setEditProfileModal]);

  if (!editProfileModal) {
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!nome || !email) {
        setFormActive(true);
        return;
      }
      const response = await api.put(
        "/usuario",
        {
          nome: nome,
          email: email,
          cpf: cpf,
          telefone: telefone,
          senha: newPassword,
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
      setEditProfileModal(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="backdrop">
      <div className="container-modal-edit back-modal">
        <div className="close">
          <img
            src={Close}
            alt="close"
            onClick={() => setEditProfileModal(false)}
          />
        </div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { marginBottom: "15px", width: "379px" },
          }}
          noValidate
          autoComplete="on"
        >
          <h1 className="title">Edite seu cadastro</h1>
          <h3 className="label">Nome*</h3>
          {!formActive ? (
            <TextField
              id="filled-basic"
              size="small"
              variant="outlined"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
          ) : (
            <TextField
              size="small"
              error
              id="filled-error-helper-text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
              variant="outlined"
            />
          )}
          <h3 className="label">Email*</h3>
          {!formActive ? (
            <TextField
              id="filled-basic"
              size="small"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            <TextField
              size="small"
              error
              id="filled-error-helper-text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              helperText="Email ou senha Invalidos"
              variant="outlined"
            />
          )}
          <div className="cpf-telefone">
            <div className="cpf">
              <h3 className="label">CPF</h3>
              {!formActive ? (
                <TextField
                  id="filled-basic"
                  size="small"
                  label="Digite seu CPF"
                  variant="outlined"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  size="small"
                  error
                  id="filled-error-helper-text"
                  label="Error"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                  variant="outlined"
                />
              )}
            </div>
            <div>
              <h3 className="label">Telefone</h3>
              {!formActive ? (
                <TextField
                  id="filled-basic"
                  size="small"
                  label="Digite seu Telefone"
                  variant="outlined"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  size="small"
                  error
                  id="filled-error-helper-text"
                  label="Error"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
                  variant="outlined"
                />
              )}
            </div>
          </div>
          <h3 className="label-senha">Nova Senha*</h3>
          {!formActive ? (
            <TextField
              id="filled-password-input"
              size="small"
              label="Digite sua senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          ) : (
            <TextField
              size="small"
              error
              id="filled-error-helper-text"
              label="Error"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              helperText="Email ou senha Invalidos"
              variant="outlined"
            />
          )}
          <h3 className="label-senha">Confirmar Senha*</h3>
          {!formActive ? (
            <TextField
              id="filled-password-input"
              size="small"
              label="Digite sua senha"
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          ) : (
            <TextField
              size="small"
              error
              id="filled-error-helper-text"
              label="Error"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              helperText="Email ou senha Invalidos"
              variant="outlined"
            />
          )}
          <br />
          <div className="div-btn">
            <Button
              className="btn-cadastrar"
              variant="contained"
              color="success"
              type="submit"
              rounded
              style={{ textTransform: "none", borderRadius: "10px" }}
              onClick={handleSubmit}
            >
              Aplicar
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default EditModal;
