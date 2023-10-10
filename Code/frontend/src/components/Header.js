import React, { useState } from "react";
import { Redirect } from "react-router";


function Header(props) {
  const [state, setState] = useState({
    goToLogin: false,
  });

  const clickSignIn = () => {
    setState({ goToLogin: true }, () => {
      console.log(state);
    });
  };

  return (
    <div>
      {state.goToLogin ? (
        <Redirect to="/login" />
      ) : (
        <ul className="navbar-ul">
          <li className="navbar-li nav-brand">Recipe Recommender</li>
          {props.loginFlag ? (
            <li className="navbar-li navbar-li-right">Saved Recipes</li>
          ) : (
            <li className="navbar-li navbar-li-right">
              <button
                style={{
                  border: "none",
                  height: "100%",
                  width: "6rem",
                  cursor: "pointer",
                }}
                onClick={clickSignIn}
              >
                Sign In
              </button>
            </li>
          )}
        </ul>
      )}
    </div>

    // <div id="head_container">
    //   <h1 id="head"> Recipe Recommender</h1>
    // </div>
  );
}
export default Header;