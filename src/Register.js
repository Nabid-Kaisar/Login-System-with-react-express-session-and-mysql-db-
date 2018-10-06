import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);

    this.handleUsername  = this.handleUsername.bind(this);
    this.handleEmail  = this.handleEmail.bind(this);
    this.handlePassword  = this.handlePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleRegister() {
    fetch("http://localhost:5000/postRegisterInfo", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }),
      method: "POST"
    })
      .then(response => {
        console.log("json response: ", response);
        return response.json();
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
        <h4>Valid Email Address</h4>
        <input type="text" name="email" onChange={this.handleEmail} />

        <br />
        <h4>Password</h4>
        <input type="text" name="password" onChange={this.handlePassword} />
        <br />
        <br />
        <button onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

export default Register;
