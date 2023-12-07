import { useState } from 'react';
import { createUser } from '../services/userAPI';

function Login() {
  const [nameData, setName] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  function handleNameChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setName(target.value);
    if (target.value.length >= 3) {
      setBtnDisabled(false);
    }
  }

  return (
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
        onClick={ createUser({ name: nameData }) }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
