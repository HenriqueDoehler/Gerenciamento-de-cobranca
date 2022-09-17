import { useNavigate } from "react-router-dom";
import useGlobalContextProvider from "../../../hooks/useGlobalContextProvider";
import EditProfileIcon from "../../../images/icons/editProfileIcon.svg";
import LogoutIcon from "../../../images/icons/logoutIcon.svg";
import PolygonIcon from "../../../images/icons/polygonIcon.svg";
import EditModal from "../Edit";
import "./styles.css";

function ProfileOptions() {
  const navigate = useNavigate();

  const { clearToken, clearUser, editProfileModal, setEditProfileModal } =
    useGlobalContextProvider();

  function handleLogout() {
    clearToken();
    clearUser();
    navigate("/");
  }

  return (
    <>
      <EditModal
        editProfileModal={editProfileModal}
        setEditProfileModal={setEditProfileModal}
      />

      <div className="container-profile-options">
        <img className="polygonIcon" src={PolygonIcon} alt="Poligono Icone" />
        <div className="box-options-profile">
          <img
            src={EditProfileIcon}
            alt="Editar Perfil"
            onClick={() => setEditProfileModal(true)}
          />
          <img src={LogoutIcon} alt="Sair" onClick={handleLogout} />
        </div>
      </div>
    </>
  );
}

export default ProfileOptions;
