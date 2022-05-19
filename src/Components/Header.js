import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    // objectUser: {},
    userName: '',
  }

  componentDidMount = async () => {
    const usuario = await getUser();
    this.setState({
      userName: usuario.name }, () => this.validar());
  };

  validar = () => {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        { loading
          ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{ userName }</p> }
      </header>
    );
  }
}

export default Header;
