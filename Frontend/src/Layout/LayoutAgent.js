import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";

import Agent from "../Pages/Agent/Agent";
//import Search from "../Search/Search"; 
const LayoutAgent=({childrens})=>
{
    return (
        <div className="layout">
            <div className="main-container">
                <Sidebar/>
                <div className="content">
                    <Header className="header" /> 
                    <div className="pages">
                        <div className="pages">
                              <Agent className="dashboard" />
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutAgent;