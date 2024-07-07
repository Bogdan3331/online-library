import React, { Fragment, useState } from "react";
import Header from "../Components/Layout/Header/Header";
import SideMenu from "../Components/Layout/Sidemenu/Sidemenu";
import Title from "../Components/Layout//Title/Title";
import PrimaryBtn from "../Components/Buttons/PrimaryBtn";

const Bibliotekari: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div>
        <Header />
      </div>
      <div className="layout">
        <div className="Sidemenu">
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="Title">
          <Title isOpen={isOpen} />
          <PrimaryBtn />
        </div>
      </div>
    </Fragment>
  );
};

export default Bibliotekari;
