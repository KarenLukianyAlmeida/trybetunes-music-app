import { Route, Routes, Search } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <search /> } />
    </Routes>
  );
}

export default App;
