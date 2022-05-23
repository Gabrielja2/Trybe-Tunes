import React, { Component } from 'react';
import AlbumCard from '../Components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistInput: '',
    isButtonDisabled: true,
    isLoading: false,
    colection: [],
    artista: '',
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
    const { artistInput } = this.state;
    const minInputArtistLength = 2;

    if (artistInput.length < minInputArtistLength) {
      return this.setState({
        isButtonDisabled: true,
      });
    }
    return this.setState({
      isButtonDisabled: false,
    });
  };

  searchAlbum = async () => {
    const { artistInput } = this.state;
    this.setState(
      { isLoading: true, artista: artistInput },
      async () => {
        this.setState({ colection: await searchAlbumsAPI(artistInput) });
      },
    );
    this.setState({ artistInput: '' });
    this.setState({ isLoading: false });
  }

  render() {
    const { isButtonDisabled, artistInput, isLoading, colection, artista } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="search"
              data-testid="search-artist-input"
              name="artistInput"
              onChange={ this.onInputChange }
              value={ artistInput }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.searchAlbum }
          >
            Pesquisar
          </button>
        </form>
        { isLoading ? <p>Carregando...</p> : (
          <AlbumCard
            artista={ artista }
            colection={ colection }
          />
        )}
      </div>
    );
  }
}

export default Search;
