import { useEffect, useState } from 'react';
import { SongType } from '../types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

type MusicCardProps = {
  musicInfo: SongType;
  unFavorite?: (trackId:number) => void ;
};

function MusicCard({ musicInfo, unFavorite = () => {} }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { trackName, previewUrl, trackId } = musicInfo;

  const handleChange = () => {
    if (isFavorite) {
      setIsFavorite(false);
      removeSong(musicInfo);
      unFavorite(trackId);
    } else {
      setIsFavorite(true);
      addSong(musicInfo);
    }
  };

  useEffect(() => {
    const configMusics = async () => {
      const favoritsSongs = await getFavoriteSongs();
      if (favoritsSongs.find((song) => song.trackId === trackId)) {
        setIsFavorite(true);
      }
    };
    configMusics();
  }, [trackId]);

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <div className="check-image">
        <label
          htmlFor={ String(trackId) }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            name="isFavorite"
            id={ String(trackId) }
            value="isFavorite"
            checked={ isFavorite }
            onChange={ handleChange }
          />
          {
            isFavorite
              ? <img src="/src/images/checked_heart.png" alt="favorite" />
              : <img src="/src/images/empty_heart.png" alt="favorite" />
            }
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
