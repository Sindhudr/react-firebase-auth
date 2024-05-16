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

  var emailfield = document.getElementById("email-field");
  var emailError = document.getElementById("email-error");

  function validateEmail() {
    if (
      !emailfield.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
    ) {
      emailError.innerHTML = "please enter valid email";
      return false;
    }
    emailError.innerHTML = "";
    return true;
  }

  useEffect(() => {}, []);
  if (isLoggedIn) {
    return <Navigate to="/DashB" />;
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
            required
            onChange={(e) => setEmail(e.target.value)}
            id="email-field"
            onKeyUp={validateEmail()}
          />
          <span id="email-error"></span>
        </label>
        <label htmlFor="Password">
          Password:
          <input
            type="Password"
            placeholder="Password"
            required
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
