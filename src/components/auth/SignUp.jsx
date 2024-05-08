import React, { useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account Created");
      alert("Account Created Successfully.Please Login ");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit"> Sign Up</button> <br />
        <p>
          Already Registered?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
