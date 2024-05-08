import React, { useEffect, useState } from "react";
import SignUp from "./components/auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./muidashboard/Dashboard";

import Users from "./pages/Users";
import Roles from "./pages/Roles";
import TableRole from "./muidashboard/TableRole";

import View from "./pages/View";
import RolesBack from "./muidashboard/RolesBack";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/Main";
import Header from "./pages/Header";
import { auth } from "./components/auth/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DashB from "./muidashboard/DashB";
//import { auth } from "../../firebase";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer position="top-center" />

        <Routes>
          {/* authUser ? (
          <Route exact path="/" element={<Dashboard />} />
          ) : ( */}
          <Route exact path="/" element={<Login />} />

          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/roles" element={<Roles />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/Roles" element={<Roles />} />
          <Route exact path="/TableRole" element={<TableRole />} />
          <Route exact path="/RolesBack" element={<RolesBack />} />
          <Route exact path="/DashB" element={<DashB />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
