import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import DistrictSelector from './components/DistrictSelector';
import { t, setLocale, getLocale } from './i18n';

function App() {
  const [district, setDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [currentLang, setCurrentLang] = useState(getLocale());

  useEffect(() => {
    // fetch district list from backend
    fetch(process.env.REACT_APP_API_BASE_URL ? `${process.env.REACT_APP_API_BASE_URL}/mgnrega/districts` : '/api/mgnrega/districts')
      .then(r => r.json())
      .then(j => { if (j.ok) setDistricts(j.districts || []); })
      .catch(() => { /* ignore */ });
  }, []);

  const changeLanguage = (lang) => {
    setLocale(lang);
    setCurrentLang(lang);
  };

  return (
    <div className="app-root">
      <header className="header">
        <h1>{t('title')}</h1>
        <div className="lang-switch">
          <button 
            className={currentLang === 'hi' ? 'active' : ''} 
            onClick={() => changeLanguage('hi')}
          >
            हिंदी
          </button>
          <button 
            className={currentLang === 'en' ? 'active' : ''} 
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </header>

      <main>
        <DistrictSelector
          districts={districts}
          onSelect={setDistrict}
          currentLang={currentLang}
        />

        {district ? (
          <Dashboard district={district} key={`${district}-${currentLang}`} />
        ) : (
          <div className="placeholder">{t('chooseDistrict')}</div>
        )}
      </main>

      <footer className="footer">&copy; MGNREGA Viewer</footer>
    </div>
  );
}

export default App;
