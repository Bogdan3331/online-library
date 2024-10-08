import React, { useState } from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import Layout from "../../Components/Layout/Layout";
import UceniciTable from "./UceniciTable";
import "./Ucenici.css";

const Ucenici: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout title="Ucenici">
      <div className="bottom-right">
        <div className="top">
          <PrimaryBtn link="add-ucenik" className="primaryBtn">
            <i className="bi bi-plus-lg"></i> Novi Ucenik/ca
          </PrimaryBtn>
          <div className="search-bar">
            <i className="bi bi-search" />
            <input
              className="search-input"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <UceniciTable searchQuery={searchQuery} />
      </div>
    </Layout>
  );
};

export default Ucenici;
