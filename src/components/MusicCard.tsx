import { useState } from 'react';
import { SongType } from '../types';

type MusicCardProps = {
  musicInfo: SongType;
};

function MusicCard({ musicInfo }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { trackName, previewUrl, trackId } = musicInfo;

  const handleChange = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  };

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
          htmlFor="favorite"
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            name="isFavorite"
            id="favorite"
            value="isFavorite"
            checked={ isFavorite }
            onChange={ handleChange }
          />
          {
            isFavorite
              ? <img src="../src/images/checked_heart.png" alt="favorite" />
              : <img src="../src/images/empty_heart.png" alt="favorite" />
            }
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
