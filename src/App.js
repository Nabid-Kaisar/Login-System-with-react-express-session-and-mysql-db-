import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to="/register">Register</Link>
            <br />
            <Link to="/login">Login</Link>
            <br />
            <Link to="/logout">Logout</Link>
            <br />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
