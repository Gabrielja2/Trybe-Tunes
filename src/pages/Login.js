import React, { Component } from 'react';

class Login extends Component {
  render() {
    console.log(this.props);
    return (
      <div data-testid="page-login">
        Olá aqui é o login
      </div>

    );
  }
}

export default Login;
