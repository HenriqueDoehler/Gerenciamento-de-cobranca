import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";
import Check from "../../images/icons/Check.svg";
import Circle from "../../images/icons/circleCheck.svg";
import api from "../../services/api";
import "./styles.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

function Register() {
  const [email, setEmail] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const { token, setUser, setToken } = useGlobalContext();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formActive, setFormActive] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  function HandleReset() {
    setEmail("");
    setPassword("");
  }
  console.log();
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      if (!email || !name || !password) {
        setFormActive(true);
        return;
      }
      if (password !== ConfirmPassword) {
        setFormActive(true);
        return;
      }
      if (password < 6) {
        setFormActive(true);
        return;
      }

      const response = await api.post("/usuario", {
        nome: name,
        email: email,
        senha: password,
      });
      if (response.status > 202) {
        return;
      }

      HandleReset();
      const { usuario, token } = response.data;
      setToken(token);
      setUser(usuario);
      handleNext();
    } catch (error) {
      setFormActive(true);
      console.log(error);
    }
  }
  useEffect(() => {
    if (name === "" || email === "") {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [navigate, token, name, email]);

  const options = {
    shouldForwardProp: (prop) => prop !== "rounded",
  };
  const Button = styled(
    MuiButton,
    options
  )(({ rounded }) => ({
    borderRadius: rounded ? "10px" : null,
  }));
  const steps = [
    {
      label: "Cadastre-se",
      description: `Por favor, escreva seu nome e e-mail`,
    },
    {
      label: "Escolha uma senha",
      description: "Escolha uma senha segura",
    },
    {
      label: "Cadastro realizado com sucesso",
      description: `E-mail e senha cadastrados com sucesso`,
    },
  ];
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <div className="register-Container">
      <div className="steps">
        <div className="steps-box">
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step) => (
                <Step
                  key={step.label}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "green",
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                      {
                        color: "green",
                      },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "green",
                      fontWeight: 900,
                      fontSize: 26,
                      fontFamily: "Montserrat",
                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white",
                      },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      visibility: "show",
                      position: "relative",
                    },
                  }}
                >
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>Cadastro concluido</Typography>
              </Paper>
            )}
          </Box>
        </div>
      </div>

      {activeStep === 0 ? (
        <div className="form-box">
          <div className="form-inputs-signIn">
            <h1 className="title-form">
              <nobr>Adicione seus dados</nobr>
            </h1>
            <Box
              onSubmit={(e) => HandleSubmit(e)}
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "344px" },
              }}
              noValidate
              autoComplete="on"
            >
              <h5>Nome</h5>
              {!formActive ? (
                <TextField
                  id="outlined-basic"
                  label="Digite seu nome"
                  variant="outlined"
                  autoComplete="off"
                  type={"text"}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  error
                  id="outlined-error-helper-text"
                  label="Error"
                  type={"text"}
                  value={name}
                  autoComplete="off"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  helperText="Verifique todos os campos"
                  variant="outlined"
                />
              )}
              <h5>E-mail</h5>

              {!formActive ? (
                <TextField
                  id="fille-basic"
                  label="Digite seu e-mail"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  error
                  id="outlined-error-helper-text"
                  label="Error"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  helperText="Email Invalido ou Já cadastrado"
                  variant="outlined"
                />
              )}
              <br />
              <div className="div-btn">
                <Button
                  disabled={btnDisable}
                  rounded
                  style={{ textTransform: "none" }}
                  className="btn-cadastrar"
                  variant="contained"
                  onClick={handleNext}
                >
                  Continuar
                </Button>
              </div>
            </Box>
            <span>
              <nobr>
                Já possui uma conta? faça seu <Link to="/"> Login</Link>{" "}
              </nobr>
            </span>
          </div>
        </div>
      ) : activeStep === 1 ? (
        <div className="form-inputs">
          <div className="form-box-2">
            <h1 className="title-form">
              <nobr>Escolha uma senha</nobr>{" "}
            </h1>

            <Box
              onSubmit={(e) => HandleSubmit(e)}
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "344px" },
              }}
              noValidate
              autoComplete="on"
            >
              <h5>Senha*</h5>
              {!formActive ? (
                <TextField
                  id="outlined-password-input"
                  label={"Digite sua senha"}
                  variant="outlined"
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="viewBtn"
                          onClick={handleClickShowPassword}
                        />
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <TextField
                  error
                  id="outlined-error-helper-text"
                  label="Error"
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  helperText="Email ou senha Invalidos"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="viewBtn"
                          onClick={handleClickShowPassword}
                        />
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <h5>Confirme sua senha</h5>

              {!formActive ? (
                <TextField
                  id="outlined-password-input"
                  label=" Confirme sua senha"
                  variant="outlined"
                  value={ConfirmPassword}
                  type={values.showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="viewBtn"
                          onClick={handleClickShowPassword}
                        />
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <TextField
                  error
                  id="outlined-error-helper-text"
                  label="Error"
                  type={values.showPassword ? "text" : "password"}
                  value={values.ConfirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  helperText="Email ou senha Invalidos"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="viewBtn"
                          onClick={handleClickShowPassword}
                        />
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <br />
              <div className="div-btn">
                <Button
                  rounded
                  style={{ textTransform: "none" }}
                  type="button"
                  className="btn-cadastrar"
                  variant="contained"
                  onClick={HandleSubmit}
                  onSubmit={handleNext}
                >
                  {" "}
                  Finalizar cadastro
                </Button>
              </div>
            </Box>
            <span>
              <nobr>
                Já possui uma conta? faça seu <Link to="/"> Login</Link>{" "}
              </nobr>
            </span>
          </div>
        </div>
      ) : activeStep === 2 ? (
        <div className="final-steps">
          <div className="box-container">
            <div className="box-check">
              <div className="check-box">
                <img src={Circle} alt="check" />
              </div>
              <img src={Check} alt="check" />
            </div>
            <div className="div-h1">
              <h1>Cadastro realizado com sucesso!</h1>
              <br />
            </div>
            <div className="div-button">
              <Button
                rounded
                style={{ textTransform: "none" }}
                type="button"
                className="btn-cadastrar"
                variant="contained"
                onClick={() => navigate("/")}
              >
                Ir para login
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Register;
