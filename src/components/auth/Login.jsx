import React, { useEffect, useState } from "react";
import "../style.css";
import { Link, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful");
      //alert();
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);
  if (isLoggedIn) {
    return <Navigate to="/Dashboard" />;
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="Email">
          Email:
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="Password">
          Password:
          <input
            type="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit"> Login</button> <br />
        <p>
          Dont Have Account<Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
