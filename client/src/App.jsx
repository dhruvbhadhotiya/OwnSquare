import React, { useEffect, useState } from 'react';
import { AdminPortal } from './pages/admin/index.jsx';
import { InvestorPortal } from './pages/investor/index.jsx';

function getInitialPortal() {
  if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#investor') {
    return 'investor';
  }
  return 'admin';
}

export function App() {
  const [portal, setPortal] = useState(getInitialPortal);

  useEffect(() => {
    document.title = portal === 'investor' ? 'OwnSquare | Investor Portal' : 'OwnSquare | Admin Portal';
    if (window.location.hash !== `#${portal}`) {
      window.location.hash = portal;
    }
  }, [portal]);

  useEffect(() => {
    const syncPortalFromHash = () => {
      setPortal(window.location.hash.toLowerCase() === '#investor' ? 'investor' : 'admin');
    };

    window.addEventListener('hashchange', syncPortalFromHash);
    return () => window.removeEventListener('hashchange', syncPortalFromHash);
  }, []);

  return portal === 'investor' ? <InvestorPortal /> : <AdminPortal />;
}

export default App;
