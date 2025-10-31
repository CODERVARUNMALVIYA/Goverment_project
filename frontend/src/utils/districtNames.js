/**
 * District name translations and search helper
 * Uses i18n translations first, then shows "(जिला)" suffix for untranslated districts in Hindi mode
 */
import { t } from '../i18n';

/**
 * Get Hindi name for a district
 * First checks i18n translations, if not found returns English name with Hindi suffix
 */
export function getHindiName(englishName) {
  const translated = t(englishName);
  // If translation exists and is different from English name, use it
  if (translated && translated !== englishName) {
    return translated;
  }
  // For untranslated districts, show English name with district suffix in Hindi
  return `${englishName}`; // Keep English for districts without translation
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
    const hindiName = t(districtName);
    // Return Hindi translation if it exists and is different from English
    if (hindiName && hindiName !== districtName) {
      return hindiName;
    }
    // Otherwise return English name (user can still search in both languages)
    return districtName;
  }
  return districtName;
}
