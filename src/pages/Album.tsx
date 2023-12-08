import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { SongType, AlbumType } from '../types';
import MusicCard from '../components/MusicCard';
import { Loading } from '../components/Loading';

function Album() {
  const [loading, setLoading] = useState(true);
  const [musicData, setMusicData] = useState<SongType[]>();
  const [albumData, setAlbumData] = useState<AlbumType>();

  const params = useParams();

  useEffect(() => {
    const receiveMusics = async () => {
      if (params.id) {
        const musicsList = await getMusics(params.id);
        setMusicData(musicsList.slice(1) as SongType[]);
        setAlbumData(musicsList[0]);
      }
    };
    receiveMusics();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? <Loading /> : (
        <div>
          <h1 data-testid="artist-name">{albumData?.artistName}</h1>
          <h2 data-testid="album-name">{albumData?.collectionName}</h2>
          {musicData?.map((music, index) => (
            <div key={ index }>
              <MusicCard
                key={ index }
                musicInfo={ music }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Album;
