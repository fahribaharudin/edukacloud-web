import Auth from "../Auth";
import React from "react";
import {withRouter} from "react-router-dom";

const AuthButton = withRouter(({ history }) => (
  Auth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
      Auth.signOut(() => history.push('/'))
    }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

export default AuthButton;