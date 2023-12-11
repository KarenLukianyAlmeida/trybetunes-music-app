import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import { Loading } from './Loading';

function Header() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    const receiveUser = async () => {
      const userInfo = await getUser();
      setUserData(userInfo);
      setLoading(false);
    };
    receiveUser();
  }, []);

  return (
    <div>
      {loading ? <Loading /> : (
        <header data-testid="header-component">
          <nav>
            <NavLink to="/search" data-testid="link-to-search">Procurar</NavLink>
            <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
            <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
          </nav>
          <div>
            <h1 data-testid="header-user-name">{userData?.name}</h1>
          </div>
        </header>
      )}
    </div>
  );
}

export default Header;
