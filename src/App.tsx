import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { AlbumType } from './types';

function App() {
  const [artistData, setArtistData] = useState<AlbumType[]>([]);

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route
          path="/search"
          element={ <Search
            artistData={ artistData }
            setArtistData={ setArtistData }
          /> }
        />
        <Route
          path="/album/:id"
          element={ <Album /> }
        />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
