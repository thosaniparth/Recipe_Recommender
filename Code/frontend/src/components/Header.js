import React, { useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from 'react-router-dom';


function Header(props) {
  const history = useHistory();

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
          <li className="navbar-li nav-brand" onClick={() => history.push('/home')} style={{ cursor: "pointer" }}>Recipe Recommender</li>
          
          <li className="navbar-li navbar-li-right" onClick={() => history.push('/add-recipe')} style={{ cursor: "pointer" }}>Add Recipes</li>
          <li className="navbar-li navbar-li-right" onClick={() => history.push('/search-recipe')} style={{ cursor: "pointer" }}>Search Recipes</li>
        </ul>
      )}
    </div>

    // <div id="head_container">
    //   <h1 id="head"> Recipe Recommender</h1>
    // </div>
  );
}
export default Header;