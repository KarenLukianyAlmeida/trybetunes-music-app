import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { Loading } from '../components/Loading';
import { AlbumType } from '../types';

function Search() {
  const [artistData, setArtistData] = useState<AlbumType[]>([]);
  const [artistName, setArtistName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
    if (target.value.length >= 2) {
      setBtnDisabled(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const artistObject = await searchAlbumsAPI(inputValue);
    console.log(artistObject);

    setArtistData(artistObject);
    setArtistName(inputValue);
    setLoading(false);
    setInputValue('');
  };

  return (
    <div>
      {loading ? <Loading /> : (
        <form
          onSubmit={ (e: React.FormEvent<HTMLFormElement>) => e.preventDefault() }
        >
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            value={ inputValue }
            onChange={ handleNameChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            onClick={ handleClick }
          >
            Pesquisar
          </button>
        </form>
      )}
      {artistData.length ? (
        <div>
          <div>
            <h1>
              Resultado de álbuns de:
              {' '}
              {artistName}
            </h1>
          </div>
          <section>
            <ul>
              {artistData.length && artistData.map((data, index) => (
                <li key={ data.artistId }>
                  <Link
                    to={ `/album/${data.collectionId}` }
                    data-testid={ `link-to-album-${data.collectionId}` }
                  >
                    Albúm
                    {' '}
                    {index}
                  </Link>
                  <h2>{data.collectionName}</h2>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <div>
          <h1>Nenhum álbum foi encontrado</h1>
        </div>
      )}
    </div>
  );
}

export default Search;
