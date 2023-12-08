import { SongType } from '../types';

type MusicCardProps = {
  musicInfo: SongType;
};

function MusicCard({ musicInfo }: MusicCardProps) {
  const { trackName, previewUrl } = musicInfo;
  return (
    <div>
      <h2>{trackName}</h2>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}

export default MusicCard;
