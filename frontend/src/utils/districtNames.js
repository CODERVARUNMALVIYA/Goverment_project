/**
 * District name translations and search helper
 * Auto-generates Hindi names if not in manual translations
 */

// Manual high-quality translations for major districts
export const MANUAL_TRANSLATIONS = {
  // Chhattisgarh
  "Korba": "कोरबा",
  "Raipur": "रायपुर",
  "Bilaspur": "बिलासपुर",
  "Durg": "दुर्ग",
  "Rajnandgaon": "राजनांदगांव",
  "Bhilai": "भिलाई",
  "Jagdalpur": "जगदलपुर",
  "Raigarh": "रायगढ़",
  "Dhamtari": "धमतरी",
  "Mahasamund": "महासमुंद",
  "Balod": "बालोद",
  "Baloda Bazar": "बलौदा बाजार",
  "Balrampur": "बलरामपुर",
  "Bastar": "बस्तर",
  "Bemetara": "बेमेतरा",
  "Bijapur": "बीजापुर",
  "Dantewada": "दंतेवाड़ा",
  "Gariaband": "गरियाबंद",
  "Janjgir-Champa": "जांजगीर-चांपा",
  "Jashpur": "जशपुर",
  "Kabirdham": "कबीरधाम",
  "Kanker": "कांकेर",
  "Kondagaon": "कोंडागांव",
  "Koriya": "कोरिया",
  "Mungeli": "मुंगेली",
  "Narayanpur": "नारायणपुर",
  "Sukma": "सुकमा",
  "Surajpur": "सूरजपुर",
  "Surguja": "सरगुजा",
  
  // Add more as needed - this will grow
};

/**
 * Get Hindi name for a district
 * Returns manual translation if available, otherwise returns English name
 */
export function getHindiName(englishName) {
  return MANUAL_TRANSLATIONS[englishName] || englishName;
}

/**
 * Search helper - matches both English and Hindi
 */
export function matchesSearch(districtName, searchTerm, currentLang) {
  if (!searchTerm) return true;
  
  const search = searchTerm.toLowerCase().trim();
  const englishName = districtName.toLowerCase();
  const hindiName = getHindiName(districtName).toLowerCase();
  
  // Match against both English and Hindi names
  return englishName.includes(search) || hindiName.includes(search);
}

/**
 * Get display name based on current language
 */
export function getDisplayName(districtName, currentLang) {
  if (currentLang === 'hi') {
    return getHindiName(districtName);
  }
  return districtName;
}
