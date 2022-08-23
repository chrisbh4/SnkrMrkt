import React, { useState } from "react";
import {Navigate} from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const navigate = Navigate()
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(sessionActions.login({ credential, password }))

    if(data?.errors){
        setErrors(data.errors)
        return
    }
    navigate('/home')
    return data
  };



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password })).catch(
  //     async (res) => {

  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     }
  //   );
  // };

  return (
    <div>
      <h1 id="login-header">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* <ul> */}
          {/* //! Cant console.log for some reason it unHighlights idx
           might need to make my own errors.map */}
          {errors.map((error, idx) => {
           return <p key={idx}>{error}</p>
          }

          )}
        {/* </ul> */}
        <label>
         Email :
          <input
            className="login-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password :
          <div className="login-input">

          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
        </label>

        <button className="login-submit" type="submit">Log In</button>
      </form>
      <div>
      <footer>

<p>Christian Brown</p>

<div class="networking">
  <a href="https://www.linkedin.com/in/christian-brown-8770311ba/">
  <i class="fab fa-linkedin"></i>
</a>
<a href="mailto:Chrismbh4@gmail.com">
  <i class="fas fa-envelope-square"></i>
</a>

<a href="https://github.com/chrisbh4">
  <i class="fab fa-github"></i>
</a>
</div>






</footer>
      </div>
    </div>
  );
}

export default LoginForm;
