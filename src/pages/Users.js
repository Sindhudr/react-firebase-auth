import * as AiIcons from "react-icons/ai";
import { SidebarData } from "../components/auth/SidebarData";
import "../components/dashboard/Dashboard.css";
import { IconContext } from "react-icons";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../pages/Header.css";
import UserCrudView from "../components/UserCrudView";
import Home from '../users/TaskManager'

function Users() {
  return (
    <div>
     <Header />
      <Home />
    </div>
  );
}

export default Users;
