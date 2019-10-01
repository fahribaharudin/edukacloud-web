import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Auth from "./Auth"
import Login from "./Components/Login"
// import AuthButton from "./Components/AuthButton";

Auth.checkToken();

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      Auth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login'/>
    )
  }/>
);

function App() {
  return (
    <Router>
      <div>
        {/*<AuthButton/>*/}
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/" component={() => <h2>Welcome!</h2>}/>
        <PrivateRoute path="/protected" component={() => <h2>Protected!</h2>}/>
      </div>
    </Router>
  );
}

export default App;
