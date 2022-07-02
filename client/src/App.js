import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Invitees/Auth';
import Authentication from './pages/Vendors/Authentication';
import LandingPage from './pages/LandingPage'
import Home from './pages/Invitees/Home';

function App() {
  const inviter = localStorage.getItem('token');
  return (
      <BrowserRouter>
        <Routes>
          {inviter ? <Route path="/" element={<Home />} /> : <Route path="/inviters/auth" element={<Auth />} />}
          <Route path="/home" element={<Home />}/>
          <Route path="/inviters/auth" element={<Auth />} />
          <Route path="/vendors/auth" element={<Authentication />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
