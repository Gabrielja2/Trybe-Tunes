import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  state = {
    artist: '',
    isButtonDisabled: true,
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validarInputArtist(),
    );
  }

  validarInputArtist = () => {
    const { artist } = this.state;
    const minInputArtistLength = 2;

    if (artist.length < minInputArtistLength) {
      return this.setState({
        isButtonDisabled: true,
      });
    }
    return this.setState({
      isButtonDisabled: false,
    });
  };

  render() {
    const { isButtonDisabled, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="search"
              data-testid="search-artist-input"
              name="artist"
              onChange={ this.onInputChange }
              value={ artist }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>

    );
  }
}

export default Search;
