import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.handleUsername = this.handleUsername.bind(this);

    this.handlePassword = this.handlePassword.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin() {
    fetch("http://localhost:5000/postLoginInfo", {

      headers: { "Content-Type": "application/json", 'Accept':  'application/json','Cache': 'no-cache' },
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      method: "POST"
    })
      .then(response => {
        console.log("json response: ", response);
        return response.text();
      })
      .then(resJson => {
        console.log("json response: ", resJson);
      })
      .catch(err => {
        console.log(err);
      });



  }

  render() {
    return (
      <div>
        <h4>Username</h4>
        <input type="text" name="username" onChange={this.handleUsername} />
        <br />
        <h4>Password</h4>
        <br />
        <input type="text" name="password" onChange={this.handlePassword} />
        <br /> <br />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default Login;
