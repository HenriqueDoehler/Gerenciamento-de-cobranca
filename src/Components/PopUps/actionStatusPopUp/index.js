import "./styles.css";
import SucessIconStatus from "../../../images/icons/sucessIconStatus.svg";
import CloseIconStatus from "../../../images/icons/closeIconStatus.svg";
import FailIconStatus from "../../../images/icons/failIconStatus.svg";
import CloseIconFailed from "../../../images/icons/closeIconFailed.svg";

function ActionStatusPopUp({ status, message, setPopUp }) {
  return (
    <div
      className={
        status === "sucess"
          ? "container-popUp popUp-action-sucess"
          : "container-popUp popUp-action-fail"
      }
    >
      <div>
        <img
          src={status === "sucess" ? SucessIconStatus : FailIconStatus}
          alt="ícone de status"
        />
        <p>{message}</p>
      </div>
      <img
        src={status === "sucess" ? CloseIconStatus : CloseIconFailed}
        alt="ícone de fechar"
        onClick={() => setPopUp(false)}
        className="close-popUp"
      />
    </div>
  );
}

export default ActionStatusPopUp;
