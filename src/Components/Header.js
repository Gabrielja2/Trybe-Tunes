import React from 'react';
import { Link } from 'react-router-dom';
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
      userName: usuario.name, loading: false });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          <h1>Header</h1>
          { loading
            ? <p>Carregando...</p>
            : <p data-testid="header-user-name">{ userName }</p> }
        </header>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
