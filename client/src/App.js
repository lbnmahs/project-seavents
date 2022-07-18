import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Invitees/Auth';
import Authentication from './pages/Vendors/Authentication';
import LandingPage from './pages/LandingPage'
import Home from './pages/Invitees/Home';
import VendorHome from './pages/Vendors/VendorHome';
import CreateEvent from './pages/Invitees/CreateEvent';
import EventDetail from './pages/Invitees/EventDetail';
import ViewEvent from './pages/Invitees/ViewEvent';
import Location from './pages/Invitees/Location';

function App() {
  const inviter = localStorage.getItem('token');
  const vendor = localStorage.getItem('token');

  return (
      <BrowserRouter>
        <Routes>
          {inviter &&
            <> 
              <Route path="/inviter/home" element={<Home />} />
              <Route path="/myEvent/create" element={<CreateEvent />} />
              <Route path="/myEvent/:id" element={<EventDetail />} />
              <Route path="/locations" element={<Location />} />
            </>
          }
          {vendor ? <Route path="/vendor/home" element={<VendorHome />} /> : <Route path="/vendors/auth" element={<Authentication />} />}
          <Route path="/inviters/auth" element={<Auth />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/:id" element={<ViewEvent />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
