import React, { useEffect, useState } from "react";
import Header from "../pages/Header";

import { Link, useLocation } from "react-router-dom";
import "../pages/Header.css";

const UserCrudView = () => {
  const [activeTab, setActiveTab] = useState("Main");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/main") {
      setActiveTab("Main");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  return (
    <div className="header">
      <Header />
      <div className="header-right">
        <Link to="/Main">
          <p
            className={'${activeTab === "Main" ? "active" : ""}'}
            onClick={() => setActiveTab("Main")}
          >
            Main
          </p>
        </Link>

        <Link to="/add">
          <p
            className={'${activeTab === "AddContact" ? "active" : ""}'}
            onClick={() => setActiveTab("AddContact")}
          >
            Add Contact
          </p>
        </Link>

        <Link to="/About">
          <p
            className={'${activeTab === "About" ? "active" : ""}'}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default UserCrudView;
