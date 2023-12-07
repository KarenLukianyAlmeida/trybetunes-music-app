import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { Loading } from '../components/Loading';

function Login() {
  const [nameData, setName] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
    if (target.value.length >= 3) {
      setBtnDisabled(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    await createUser({ name: nameData });
    setLoading(false);
    navigate('/search');
  };

  return (
    <div>
      {loading ? <Loading /> : (
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
      )}
    </div>
  );
}

export default Login;
