import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import SiteVisit from "../Pages/siteVisit/siteVisit";
//import Search from "../Search/Search";

const LayoutSiteVisit = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            <div className="pages">
                <SiteVisit className="dashboard" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutSiteVisit;
