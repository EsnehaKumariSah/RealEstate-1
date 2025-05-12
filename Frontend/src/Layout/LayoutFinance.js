import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
//import Search from "../Search/Search";
import Finance from "../Pages/Finance/Finance";

const LayoutFinance = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            <div className="pages">
                <Finance className="dashboard" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutFinance;
