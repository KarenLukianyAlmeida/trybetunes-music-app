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
        const [album, ...musics] = musicsList;
        setMusicData(musics);
        setAlbumData(album);
        setLoading(false);
      }
    };
    receiveMusics();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <h1 data-testid="artist-name">{albumData?.artistName}</h1>
      <h2 data-testid="album-name">{albumData?.collectionName}</h2>
      {musicData && musicData.map((music, index) => (
        <div key={ index }>
          <MusicCard
            musicInfo={ music }
          />
        </div>
      ))}
    </div>
  );
}

export default Album;
