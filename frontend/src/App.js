import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import DistrictSelector from './components/DistrictSelector';
import { t, setLocale, getLocale } from './i18n';
import { ALL_INDIA_DISTRICTS } from './constants/allIndiaDistricts';
import './styles.css';

function App() {
  const [district, setDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [currentLang, setCurrentLang] = useState(getLocale());
  const [, forceUpdate] = useState(0); // Force re-render trigger

  useEffect(() => {
    // Fetch district list from backend
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'https://goverment-project-backend.onrender.com/api';
    console.log('API Base URL:', apiBaseUrl);
    
    fetch(`${apiBaseUrl}/mgnrega/districts`)
      .then(r => r.json())
      .then(j => { 
        if (j.ok && j.districts) {
          // Merge backend districts with all India districts (remove duplicates)
          const mergedDistricts = [...new Set([...j.districts, ...ALL_INDIA_DISTRICTS])].sort();
          setDistricts(mergedDistricts);
          console.log(`✅ Loaded ${mergedDistricts.length} districts (${j.districts.length} with data, ${mergedDistricts.length - j.districts.length} without data)`);
        } else {
          // If backend fails, show all India districts
          setDistricts(ALL_INDIA_DISTRICTS);
          console.log(`✅ Loaded ${ALL_INDIA_DISTRICTS.length} India districts (backend unavailable)`);
        }
      })
      .catch((err) => { 
        console.error('Failed to fetch districts:', err);
        // Fallback to all India districts if backend fails
        setDistricts(ALL_INDIA_DISTRICTS);
        console.log(`✅ Loaded ${ALL_INDIA_DISTRICTS.length} India districts (fallback)`);
      });
  }, []);

  const changeLanguage = (lang) => {
    setLocale(lang);
    setCurrentLang(lang);
    // Force all components to re-render with new translations
    forceUpdate(prev => prev + 1);
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
          key={`selector-${currentLang}`}
        />

        {district ? (
          <Dashboard 
            district={district} 
            currentLang={currentLang}
            key={`${district}-${currentLang}`} 
          />
        ) : (
          <div className="placeholder">{t('chooseDistrict')}</div>
        )}
      </main>

      <footer className="footer">&copy; MGNREGA Viewer</footer>
    </div>
  );
}

export default App;
