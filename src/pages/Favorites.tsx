import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import { SongType } from '../types';

function Favorites() {
  const [favoritsSongs, setFavoritsSongs] = useState<SongType[]>([]);

  useEffect(() => {
    const configFavoritesSongs = async () => {
      const favorits = await getFavoriteSongs();
      setFavoritsSongs(favorits);
    };
    configFavoritesSongs();
  }, []);

  const handleUnFavorite = (trackId: number) => {
    const updateFavorits = favoritsSongs.filter((song) => (
      song.trackId !== trackId
    ));
    setFavoritsSongs(updateFavorits);
  };

  return (
    <div>
      {favoritsSongs && favoritsSongs.map((music, index) => (
        <div key={ index }>
          <MusicCard
            musicInfo={ music }
            unFavorite={ handleUnFavorite }
          />
        </div>
      ))}
    </div>
  );
}

export default Favorites;
