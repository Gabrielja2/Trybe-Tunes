import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isFavorite: false,
  }

  componentDidMount = () => {
    this.isFavoriteSong();
  }

  isFavoriteSong = async () => {
    const { musica: { trackId } } = this.props;
    const getFavorite = await getFavoriteSongs();
    const favoriteSong = getFavorite
      ? getFavorite.some((song) => song.trackId === trackId)
      : false;
    this.setState({ isFavorite: favoriteSong });
  }

   onAddFavorite = async () => {
     const { isFavorite } = this.state;
     const check = isFavorite ? removeSong() : addSong();
     this.setState({ isLoading: true });
     await check;
     this.setState({
       isLoading: false, isFavorite: !isFavorite,
     });
   }

   render() {
     const { musica: { previewUrl, trackName, trackId } } = this.props;
     const { isLoading, isFavorite } = this.state;
     return (
       <div>
         <p>{trackName}</p>
         <audio
           data-testid="audio-component"
           src={ previewUrl }
           controls
         >
           <track kind="captions" />
           O seu navegador não suporta o elemento
           {' '}
           <code>audio</code>
           .
         </audio>
         { isLoading ? <p>Carregando...</p> : (
           <label htmlFor={ `checkbox-music-${trackId}` }>
             <input
               type="checkbox"
               data-testid={ `checkbox-music-${trackId}` }
               checked={ isFavorite }
               onChange={ () => this.onAddFavorite(isFavorite) }
             />
             Favorita
           </label>
         ) }
       </div>
     );
   }
}

MusicCard.propTypes = {
  musica: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
