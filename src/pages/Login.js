import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isButtonDisabled: true,
      isLoading: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validarInputName = this.validarInputName.bind(this);
    this.chamaCreateUser = this.chamaCreateUser.bind(this);
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validarInputName(),
    );
  }

  validarInputName = () => {
    const { name } = this.state;
    const minInputNameLength = 3;

    if (name.length < minInputNameLength) {
      return this.setState({
        isButtonDisabled: true,
      });
    }
    return this.setState({
      isButtonDisabled: false,
    });
  };

  chamaCreateUser = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    const { history } = this.props;
    history.push('search');
  }

  render() {
    const { isButtonDisabled, name, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading ? <p>Carregando...</p> : (
          <form>
            <label htmlFor="login-name-input">
              Digite seu nome:
              <input
                data-testid="login-name-input"
                className="input-text"
                onChange={ this.onInputChange }
                name="name"
                type="text"
                value={ name }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              onClick={ this.chamaCreateUser }
              disabled={ isButtonDisabled }
            >
              Entrar
            </button>
          </form>
        )}
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
