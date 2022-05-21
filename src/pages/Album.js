import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  state = {
    musics: [],
    artista: [],
  }

  async componentDidMount() {
    this.getApiMusics();
  }

  getApiMusics = async () => {
    const { match: {
      params: { id } } } = this.props;
    const getMusic = await getMusics(id);
    this.setState({ musics: getMusic.filter((track) => track.trackId),
      artista: getMusic[0],
    });
  }

  render() {
    const { musics, artista } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          {' '}
          {artista.artistName}
        </p>
        <p data-testid="album-name">
          {' '}
          {artista.collectionName}
        </p>
        {musics.map((musica) => (
          <MusicCard
            key={ musica.trackId }
            musica={ musica }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
