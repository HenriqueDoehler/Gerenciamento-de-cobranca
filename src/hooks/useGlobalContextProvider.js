import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import api from "../services/api";

function useGlobalContextProvider() {
  const [token, setToken, clearToken] = useLocalStorage("token");
  const [user, setUser, clearUser] = useLocalStorage("user");
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [activeTableToggle, setActiveTableToggle] = useState(false);
  const [clientsCharge, setClientsCharges] = useState([]);
  const [openModalAddCharges, setOpenModalAddCharges] = useState(false);
  const [modalActive, setModalActive] = useState(false)
  const [charges, setCharges] = useState([]);
  const [clients, setClients] = useState([]);
  const [dataForm, setDataForm] = useState("");
  const [addClientes, setAddClientes] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [icon1, setIcon1] = useLocalStorage("icon1");
  const [icon2, setIcon2] = useLocalStorage("icon2");
  const [icon3, setIcon3] = useLocalStorage("icon3");
  const [userData, setUserData] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

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
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [token]);

  return {
    token,
    setToken,
    clearToken,
    user,
    setUser,
    clearUser,
    editProfileModal,
    setEditProfileModal,
    clients,
    setClients,
    addClientes,
    setAddClientes,
    activeTableToggle,
    setActiveTableToggle,
    clientsCharge,
    setClientsCharges,
    // detailsClients,
    // setDetailsClients,
    charges,
    setCharges,
    userData,
    setUserData,
    icon1,
    setIcon1,
    icon2,
    setIcon2,
    icon3,
    setIcon3,
    openModalAddCharges,
    setOpenModalAddCharges,
    popUp,
    setPopUp,
    dataForm,
    setDataForm,
    modalActive,
     setModalActive,
  };
}

export default useGlobalContextProvider;
