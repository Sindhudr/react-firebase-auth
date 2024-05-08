import React, { useState } from "react";

import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "../auth/SidebarData";
import "./Dashboard.css";
import { IconContext } from "react-icons";
import Header from "../../pages/Header";

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <Header />
      <div className="name">
        <p>Dashboard</p>
      </div>
    </>
  );
}

export default Dashboard;
