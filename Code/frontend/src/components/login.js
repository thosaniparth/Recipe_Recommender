import React, { useState, useContext } from "react";
import recipeDB from "../apis/recipeDB";
import { Redirect, withRouter } from "react-router";
import "./login.css";
import Header from "./Header";
import styled from 'styled-components';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function loginForm(props) {
  if (sessionStorage.getItem("login_recipe_recommender")) {
    props.history.push("/home");
  }

  const [state, setState] = useState({
    username: "",
    password: "",
    successMessage: null,
    failMessage: null,
  });

  const changeValue = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    const stateTemp = {
      username: state.username,
      password: state.password,
    };
    const response = await recipeDB
      .post("/users/authorizeUser", stateTemp)
      .catch((err) => {
        console.log(err, err.message);
      });
    if (response) {
      setState((prevState) => ({
        ...prevState,
        successMessage: "Login successful. Redirecting to home page..",
        failMessage: null,
      }));
      sessionStorage.setItem(
        "login_recipe_recommender",
        response.data["username"]
      );
      props.setLoginFlag;
      props.history.push("/home");
    } else {
      setState((prevState) => ({
        ...prevState,
        failMessage: "Login unsuccessful. Please try again.",
        successMessage: null,
      }));
    }
  };

  return (
    <MainContainer>
      <Header loginFlag={false} />

      <div id="parent" style={{ height: '100%' }}>
        <StyledForm id="form_login">
          <div>
            <label>Username</label>
            <input
              type="text"
              id="username"
              value={state.username}
              onChange={changeValue}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={changeValue}
            />
          </div>
          <br />
          <button
            className="login-btn"
            type="button"
            id="submit-btn"
            onClick={submitLogin}
          >
            Submit
          </button>
          <br />
          <br />
          {state.successMessage ? (
            <div style={{ color: "green" }}>{state.successMessage}</div>
          ) : null}
          {state.failMessage ? (
            <div style={{ color: "red" }}>{state.failMessage}</div>
          ) : null}
        </StyledForm>
      </div>
    </MainContainer>
  );
}
export default withRouter(loginForm);

const MainContainer = styled.div`
  height: 100vh;
  overflow-y: hidden;
`;

const StyledForm = styled.form`
  width: 50%;
  margin: auto;
  background-color: #eee;
  padding: 32px;
  vertical-align: middle;
  border-radius: 18px;
`;
