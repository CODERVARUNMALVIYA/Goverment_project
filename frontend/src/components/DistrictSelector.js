import React, { useState } from 'react';
import { t } from '../i18n';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

export default function DistrictSelector({ districts = [], onSelect, currentLang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  async function detectLocation() {
    if (!navigator.geolocation) {
      alert('आपका ब्राउज़र location detection support नहीं करता। कृपया manually district select करें।');
      return;
    }
    
    setIsDetecting(true);
    
    // First check permission status
    if (navigator.permissions) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        console.log('Location permission status:', permissionStatus.state);
        
        if (permissionStatus.state === 'denied') {
          alert('Location permission denied है। Browser settings में जाकर location permission enable करें।');
          setIsDetecting(false);
          return;
        }
      } catch (e) {
        console.log('Permission API not available, continuing...');
      }
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Got coordinates:', latitude, longitude);
        
        try {
          // Using Nominatim for reverse geocoding (free, no API key needed)
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const response = await fetch(url, {
            headers: { 'User-Agent': 'MGNREGADistrictApp/1.0' }
          });
          
          if (!response.ok) {
            throw new Error('Geocoding failed');
          }
          
          const locationData = await response.json();
          console.log('Location data:', locationData);
          const addr = locationData.address || {};
          
          // Try different address fields to find district
          const possibleDistrict = addr.county || addr.state_district || addr.town || addr.city || addr.state;
          
          if (possibleDistrict) {
            console.log('Detected location:', possibleDistrict);
            
            // Try to match with our district list (case-insensitive partial match)
            const matchedDistrict = districts.find(d => 
              d.toLowerCase().includes(possibleDistrict.toLowerCase()) ||
              possibleDistrict.toLowerCase().includes(d.toLowerCase())
            );
            
            if (matchedDistrict) {
              console.log('Matched district:', matchedDistrict);
              // Automatically select the district without showing alert
              onSelect(matchedDistrict);
              setIsDetecting(false);
              return; // Exit after successful selection
            } else {
              // Try fuzzy matching - find closest district name
              const fuzzyMatch = districts.find(d => {
                const districtWords = d.toLowerCase().split(' ');
                const locationWords = possibleDistrict.toLowerCase().split(' ');
                return districtWords.some(dw => locationWords.some(lw => lw.includes(dw) || dw.includes(lw)));
              });
              
              if (fuzzyMatch) {
                console.log('Fuzzy matched district:', fuzzyMatch);
                // Show confirmation with auto-select
                if (window.confirm(`📍 आपकी location: ${possibleDistrict}\n\n✓ सबसे नजदीकी district: ${t(fuzzyMatch)}\n\nक्या यह select करें?`)) {
                  onSelect(fuzzyMatch);
                  setIsDetecting(false);
                  return;
                }
              }
              
              // If still no match, offer to add district to database
              const shouldAdd = window.confirm(
                `📍 पता चला: ${possibleDistrict}\n` +
                `State: ${addr.state || 'Unknown'}\n\n` +
                `यह जिला database में नहीं है।\n\n` +
                `क्या इस district को database में add करें?\n` +
                `(आपके लिए data generate होगा)`
              );
              
              if (shouldAdd) {
                // Add district to database
                console.log('Adding new district to database...');
                
                try {
                  const apiBase = process.env.REACT_APP_API_BASE_URL || '/api';
                  const response = await fetch(`${apiBase}/mgnrega/add-district`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      district: possibleDistrict,
                      state: addr.state || 'Unknown',
                      detectedFrom: 'GPS auto-detection'
                    })
                  });
                  
                  const result = await response.json();
                  
                  if (result.ok) {
                    console.log('✅ District added:', result);
                    alert(`✅ District "${possibleDistrict}" successfully added!\n\nDashboard load हो रहा है...`);
                    
                    // Automatically select the newly added district
                    onSelect(possibleDistrict);
                    setIsDetecting(false);
                    return;
                  } else {
                    throw new Error(result.message || 'Failed to add district');
                  }
                } catch (addError) {
                  console.error('Error adding district:', addError);
                  alert(`❌ District add करने में error: ${addError.message}\n\nकृपया manually search करें।`);
                }
              }
              
              setIsDetecting(false);
            }
          } else {
            alert('Location से district पता नहीं चल सका। कृपया manually select करें।');
          }
        } catch (err) {
          console.error('Geocoding error:', err);
          alert('Location detect करने में problem आई। कृपया manually district select करें।');
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        setIsDetecting(false);
        let errorMsg = 'Location access denied या unavailable है।';
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = '❌ Location permission denied!\n\nBrowser settings में जाकर location permission allow करें।';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information unavailable। GPS या network check करें।';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timeout हो गया। फिर से try करें।';
        }
        
        alert(errorMsg + '\n\nManually district select करें।');
        console.error('Geolocation error:', error);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 0 
      }
    );
  }

  const filteredDistricts = districts.filter(d => {
    const searchLower = searchTerm.toLowerCase();
    const englishName = d.toLowerCase();
    const hindiName = t(d).toLowerCase();
    return englishName.includes(searchLower) || hindiName.includes(searchLower);
  });

  return (
    <div className="district-selector">
      <div className="selector-header">
        <button 
          className="detect-btn" 
          onClick={detectLocation}
          disabled={isDetecting}
        >
          <FaMapMarkerAlt /> {isDetecting ? '📍 Location detect हो रही है...' : t('detectLocation')}
        </button>
        
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            aria-label="district-search"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="district-grid">
        {(filteredDistricts.length > 0 ? filteredDistricts : districts).slice(0, 100).map(d => (
          <button 
            key={d}
            className="district-card" 
            onClick={() => onSelect(d)}
          >
            {t(d)}
          </button>
        ))}
      </div>
      
      {filteredDistricts.length === 0 && searchTerm && (
        <div className="no-results">
          {t('noResults')}
        </div>
      )}
    </div>
  );
}
