import { NavLink } from 'react-router-dom';

function Header() {
  const [loading, setLoading] = useState(false);

  const callGetUser = () => {

  };

  return (
    <header data-testid="header-component">
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Procurar</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </nav>
      <div>
        <h1 data-testid="header-user-name" />
      </div>
    </header>
  );
}

export default Header;
