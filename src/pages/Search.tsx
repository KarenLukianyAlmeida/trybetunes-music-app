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
  const [infoDiv, setInfoDiv] = useState(false);

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
    setInfoDiv(true);
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
      {infoDiv && (
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
              {artistData.length && artistData.map((data) => {
                <li>
                  <Link
                    to={ `/album/${data.collectionId}` }
                    data-testid={ `link-to-album-${data.collectionId}` }
                  >
                    Albúm
                  </Link>
                </li>;
              })}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

export default Search;
