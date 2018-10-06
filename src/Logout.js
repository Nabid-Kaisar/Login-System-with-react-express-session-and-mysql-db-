import React, { Component } from "react";

class Logout extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    fetch("http://localhost:5000/logout", {

      headers: { "Content-Type": "application/json", 'Accept':  'application/json','Cache': 'no-cache' },
      credentials: 'include',


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

  render(){
    return(
      <button onClick={this.handleLogout}>Logout</button>
    )
  }

}
export default Logout;
