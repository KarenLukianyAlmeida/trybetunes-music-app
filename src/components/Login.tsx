import { useState } from 'react';
import { createUser } from '../services/userAPI';
import { Loading } from './Loading';

function Login() {
  const [nameData, setName] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
    if (target.value.length >= 3) {
      setBtnDisabled(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    createUser({ name: nameData });
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={ (e: React.FormEvent<HTMLFormElement>) => e.preventDefault() }
      >
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Qual é o seu nome?"
          value={ nameData }
          onChange={ handleNameChange }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ btnDisabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
      {loading && (
        <Loading />
      )}
    </div>
  );
}

export default Login;
