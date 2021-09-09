import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
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
    </div>
  );
}

export default LoginForm;
