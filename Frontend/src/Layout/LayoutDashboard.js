// 
import React from "react";
import Sidebar from "../Component/Sidebar/Sidebar";
import Header from "../Component/Header/Header";
import Dashboard from "../Pages/Dashboard/Dashboard.js";

const LayoutDashboard = () => {
  return (
    <div className="layout">
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Header className="header" />
          <div className="pages">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;