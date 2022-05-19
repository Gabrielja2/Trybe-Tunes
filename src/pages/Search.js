import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
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
        <Header />
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
          <div>
            {colection.length === 0 && <p>Nenhum álbum foi encontrado</p>}
            {colection.length > 0 && (
              <span>
                { `Resultado de álbuns de: ${artista}
                `}
              </span>)}
            {colection.map((disc, index) => (
              <div key={ index }>
                <p>{disc.collectionName}</p>
                <Link
                  data-testid={ `link-to-album-${disc.collectionId}` }
                  to={ `/album/${disc.collectionId}` }
                >
                  <img src={ disc.artworkUrl100 } alt={ disc.collectionName } />
                </Link>
                <p>{ disc.artistName }</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
