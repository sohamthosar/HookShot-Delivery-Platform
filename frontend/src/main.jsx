import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import LoginSignup from './screens/LoginSignup.jsx';
import OverviewDashboard from './screens/OverviewDashboard.jsx';
import EndpointsManagement from './screens/EndpointsManagement.jsx';
import Deliveries from './screens/Deliveries.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import './style.css';

const screens = {
  overview: OverviewDashboard,
  endpoints: EndpointsManagement,
  deliveries: Deliveries,
  login: LoginSignup,
};
function App() {
  // const [screen, setScreen] = useState(new URLSearchParams(location.search).get('screen') || 'overview');
  // const Page = screens[screen] || OverviewDashboard;
  // return <><Page /><label className="screen-picker"><span>SCREEN</span><select value={screens[screen] ? screen : 'overview'} onChange={e => setScreen(e.target.value)} aria-label="Choose screen"><option value="overview">Overview</option><option value="endpoints">Endpoints</option><option value="deliveries">Deliveries</option><option value="login">Sign in</option></select></label></>;

  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginSignup />} />
        <Route path="/overview" element={<OverviewDashboard />} />
        <Route path="/endpoints" element={<EndpointsManagement />} />
        <Route path="/deliveries" element={<Deliveries />} />

      </Routes>
    </BrowserRouter>
  );
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
