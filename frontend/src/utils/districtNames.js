/**
 * District name translations and search helper
 * Uses comprehensive Hindi names dictionary + i18n fallback
 */
import { t } from '../i18n';
import { DISTRICT_HINDI_NAMES } from '../constants/districtHindiNames';

/**
 * Get Hindi name for a district
 * Priority: 1) Comprehensive dictionary 2) i18n translation 3) English name
 */
export function getHindiName(englishName) {
  // First check comprehensive dictionary
  if (DISTRICT_HINDI_NAMES[englishName]) {
    return DISTRICT_HINDI_NAMES[englishName];
  }
  
  // Fallback to i18n
  const translated = t(englishName);
  if (translated && translated !== englishName) {
    return translated;
  }
  
  // If no translation, return English name
  return englishName;
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
 * In Hindi mode: shows Hindi if available, else English name
 * In English mode: always shows English
 */
export function getDisplayName(districtName, currentLang) {
  if (currentLang === 'hi') {
    return getHindiName(districtName);
  }
  return districtName;
}
