import { useState } from "react";
import useGlobalContextProvider from "../../hooks/useGlobalContextProvider";
import DownArrowIcon from "../../images/icons/downArrowIcon.svg";
import ProfileOptions from "../Modals/ProfileOptions";

import "./styles.css";

function HeaderGlobal({ titlePage, subtitlePage }) {
  const [boxOptions, setBoxOptions] = useState(false);
  const { userData } = useGlobalContextProvider();
  const firstLetter = userData.nome[0];

  return (
    <>
      <div className="header-global">
        <h1
          className={
            titlePage === "Resumo das Cobranças"
              ? "typography-primary"
              : titlePage === "Clientes"
              ? "typography-secondary"
              : "typography-terciary"
          }
        >
          {titlePage}
        </h1>
        {subtitlePage && (
          <>
            <span className="gt-span"> &gt; </span>
            <h3 className="subtitle-chargesPage">{subtitlePage}</h3>
          </>
        )}
        <div className="container-profile">
          <div className="circle-profile">
            <h2>{firstLetter}</h2>
          </div>
          <h3>{userData.nome}</h3>
          <div className="box-options">
            <img
              src={DownArrowIcon}
              onClick={() => setBoxOptions(!boxOptions)}
              alt="Seta de Opções do Perfil"
            />
            {boxOptions && <ProfileOptions />}
          </div>
        </div>
      </div>
    </>
  );
}
export default HeaderGlobal;
