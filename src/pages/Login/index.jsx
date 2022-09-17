import { Visibility, VisibilityOff } from "@mui/icons-material";
import ThreeD from "../../3D/canvas/index";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import loginImage from "../../images/loginImage.png";
import api from "../../services/api";
import "./styles.css";
import InputAdornment from "@mui/material/InputAdornment";

function Login() {
  const [formActive, setFormActive] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setUser, setToken } = useGlobalContextProvider();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
    setPassword(e.target.value);
  };

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

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      if (!email || !password) {
        setBtnDisable(true);
        return;
      }
      const response = await api.post("/login", {
        email: email,
        senha: password,
      });
      if (response.status > 202) {
        return;
      }
      const { usuario, token } = response.data;
      navigate("/home");
      setToken(token);
      setUser(usuario);
      HandleReset();
    } catch (error) {
      setFormActive(true);
      console.log(error);
    }
  }
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);

  const options = {
    shouldForwardProp: (prop) => prop !== "rounded",
  };
  const Button = styled(
    MuiButton,
    options
  )(({ rounded }) => ({
    borderRadius: rounded ? "10px" : null,
  }));

  return (
    <div className="login-Container">
      <ThreeD />
      <div className="img-container">
        <img className="img-login" src={loginImage} alt="imagem loading..." />
      </div>
      <div className="form-inputs-signIn">
        <h1 className="title-form">
          <nobr>Faça seu login!</nobr>
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
          <h3>Email</h3>
          {!formActive ? (
            <TextField
              id="outlined-basic"
              autoFocus={true}
              label="Digite seu e-mail"
              variant="outlined"
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            <TextField
              error
              id="outlined-error-helper-text"
              label="Error"
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              helperText="Email ou senha Invalidos"
              variant="outlined"
            />
          )}
          <span className="link-login">
            <Link to="/"> Esqueceu a senha? </Link>
          </span>
          <h3>Senha </h3>
          {!formActive ? (
            <TextField
              id="outlined-password-input"
              label={"Digite sua senha"}
              variant="outlined"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="viewBtn"
                      onClick={handleClickShowPassword}
                    />
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
            />
          )}
          <br />
          <div className="div-btn">
            <Button
              disable={btnDisable}
              className="btn-cadastrar"
              variant="contained"
              color="success"
              type="submit"
              rounded
              style={{ textTransform: "none" }}
            >
              Entrar
            </Button>
          </div>
        </Box>
        <span>
          <nobr>
            Ainda não possui uma conta? <Link to="/usuarios">Cadastre-se</Link>
          </nobr>
        </span>
      </div>
    </div>
  );
}
export default Login;
