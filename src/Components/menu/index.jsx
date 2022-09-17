import { useNavigate } from "react-router-dom";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import ClientsIconBlack from "../../images/icons/clientsIconBlack.svg";
import ClientsIconPink from "../../images/icons/clientsIconPink.svg";
import HomeIconBlack from "../../images/icons/homeIconBlack.svg";
import HomeIconPink from "../../images/icons/homeIconPink.svg";
import PaperIconBlack from "../../images/icons/paperIconBlack.svg";
import PaperIconPink from "../../images/icons/paperIconPink.svg";
import "./styles.css";

function SideMenu() {
  const navigate = useNavigate();
  const { icon1, setIcon1, icon2, setIcon2, icon3, setIcon3 } =
    useGlobalContextProvider();

  const redirectPage = (icon, page) => {
    if (icon === 1) {
      setIcon1(true);
      setIcon2(false);
      setIcon3(false);
    } else if (icon === 2) {
      setIcon1(false);
      setIcon2(true);
      setIcon3(false);
    } else if (icon === 3) {
      setIcon1(false);
      setIcon2(false);
      setIcon3(true);
    }
    navigate(page);
  };

  return (
    <div className="menu-container">
      <ul className=" ul-list">
        <li key="homeMenu">
          <img
            onClick={() => redirectPage(1, "/home")}
            src={icon1 ? HomeIconPink : HomeIconBlack}
            alt="home"
          />
          <div
            className={
              icon1
                ? "line-style ls1"
                : icon2
                  ? "line-style ls2"
                  : "line-style ls3"
            }
          ></div>
        </li>
        <li key="clientsMenu">
          <img
            onClick={() => redirectPage(2, "/clients")}
            src={icon2 ? ClientsIconPink : ClientsIconBlack}
            alt="home"
          />
        </li>
        <li key="chargesMenu">
          <img
            onClick={() => redirectPage(3, "/charges")}
            src={icon3 ? PaperIconPink : PaperIconBlack}
            alt="Charges"
          />
        </li>
      </ul>
    </div>
  );
}
export default SideMenu;
