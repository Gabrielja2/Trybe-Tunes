import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCollection extends React.Component {
  render() {
    const { colection, artista } = this.props;
    return (
      <div>
        {colection.length === 0 && <p>Nenhum álbum foi encontrado</p>}
        {colection.length > 0 && (
          <span>
            { `Resultado de álbuns de: ${artista}
                `}
          </span>)}
        {colection.map(
          ({ collectionName, collectionId, artistName, artworkUrl100 }) => (
            <div key={ collectionId }>
              <p>{collectionName}</p>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ collectionName } />
              </Link>
              <p>{ artistName }</p>
            </div>
          ),
        )}
      </div>
    );
  }
}

AlbumCollection.propTypes = {
  colection: PropTypes.arrayOf(PropTypes.object).isRequired,
  artista: PropTypes.string.isRequired,
};

export default AlbumCollection;
