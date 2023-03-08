"use client";

import React, { useState } from "react";
import Link from "next/link";


function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [ValidationMessage, setValidationMessage] = useState("");

  const signup = async () => {
    //POST form values
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: name,
          email: email,
          password: password,
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    setValidationMessage(data.message)
  }

  const handleValidation = (event) => {
    let formIsValid = true;
    
    if (!/^[A-Za-z\s]*$/.test(name)) {
      console.log('name no match');
      formIsValid = false;
      setNameError(
        "Name should contain only Letters and spaces"
      );
      return false;
    } else {
      setNameError("");
      formIsValid = true;
    }

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{4,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
      signup();
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  return (
    <div className="container container-fluid">
    <div className="row mt-5 d-flex justify-content-center">
      <div className="col-10 col-lg-5 ">
        <form
          className="border border-secondary rounded p-4"
          onSubmit={loginSubmit}
        >
          <h1 className="mb-4">Register</h1>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="name_field">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <small id="emailHelp" className="text-danger form-text">
            {nameError}
          </small>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email_field">
              Email address
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <small id="emailHelp" className="text-danger form-text">
            {emailError}
          </small>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password_field">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <small id="passworderror" className="text-danger form-text">
            {passwordError}
          </small>

          <button
            type="submit"
            className="btn btn-block w-100 btn-primary btn-block mb-4"
          >
            Register
          </button>
          <div className="mt-1">{ValidationMessage}</div>
          <div className="text-center">
            <p>
              Already a member? <Link href="/signup">Sign in</Link>
            </p>
          </div>
          
        </form>
      </div>
    </div>
  </div>
  );
}
export default App;
