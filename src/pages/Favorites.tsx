import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import { SongType } from '../types';

function Favorites() {
  const [favoritsSongs, setFavoritsSongs] = useState<SongType[]>([]);
  const [favoritsLength, setFavoritsLength] = useState(0);

  useEffect(() => {
    const configFavoritesSongs = async () => {
      const favorits = await getFavoriteSongs();
      console.log(favorits);

      if (favorits.length !== favoritsLength) {
        setFavoritsSongs(favorits);
        setFavoritsLength(favoritsSongs.length);
      }
    };
    configFavoritesSongs();
  }, [favoritsSongs, favoritsLength]);

  // if (favoritsSongs.length !== favoritsLength) {

  // }

  return (
    <div>
      {favoritsSongs && favoritsSongs.map((music, index) => (
        <div key={ index }>
          <MusicCard
            musicInfo={ music }
          />
        </div>
      ))}
    </div>
  );
}

export default Favorites;
