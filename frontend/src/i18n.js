// Minimal in-app translations for English and Hindi. Expand as needed.
const translations = {
  en: {
    title: 'MGNREGA District Performance',
    detectLocation: 'Detect my district',
    chooseDistrict: 'Choose district',
    lastUpdated: 'Last updated',
    month: 'Month',
    year: 'Year',
    noData: 'No data available',
    refresh: 'Refresh data',
    loading: 'Loading',
    searchPlaceholder: 'Search district...',
    noResults: 'No matching districts found',
    // Month names
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    // Stats
    totalJobcards: 'Total Jobcards',
    totalWorkers: 'Total Workers',
    persondays: 'Person Days Generated',
    works: 'Works Completed',
    expenditure: 'Total Expenditure (₹ Lakhs)',
    workersLabel: '👷‍♂️ Total Workers',
    jobcardsLabel: '📋 Total Jobcards',
    persondaysLabel: '🧱 Total Person Days',
    expenditureLabel: '💰 Total Expenditure (Lakhs)',
    fromLastYear: 'from last year',
    monthlyTrend: '📊 Monthly Trend',
    monthlyComparison: '📈 Monthly Comparison',
    // Location detection messages
    browserNotSupported: 'Your browser does not support location detection. Please select district manually.',
    locationDenied: 'Location permission is denied. Please enable location permission in browser settings.',
    yourLocation: 'Your location',
    nearestDistrict: 'Nearest district',
    selectThis: 'Select this?',
    addToDatabase: 'Add this district to database?',
    districtName: 'District Name',
    stateName: 'State Name',
    addingDistrict: 'Adding district to database...',
    districtAdded: 'District added successfully!',
    addFailed: 'Failed to add district. Please try again.',
    // District names (English - no translation needed)
    Patna: 'Patna', Gaya: 'Gaya', Muzaffarpur: 'Muzaffarpur', Bhagalpur: 'Bhagalpur', Darbhanga: 'Darbhanga',
    Nalanda: 'Nalanda', Rohtas: 'Rohtas', Purnia: 'Purnia', Begusarai: 'Begusarai', Siwan: 'Siwan',
    Lucknow: 'Lucknow', Kanpur: 'Kanpur', Varanasi: 'Varanasi', Agra: 'Agra', Allahabad: 'Allahabad',
    Meerut: 'Meerut', Bareilly: 'Bareilly', Aligarh: 'Aligarh', Gorakhpur: 'Gorakhpur', Noida: 'Noida',
    Bhopal: 'Bhopal', Indore: 'Indore', Jabalpur: 'Jabalpur', Gwalior: 'Gwalior', Ujjain: 'Ujjain',
    Sagar: 'Sagar', Rewa: 'Rewa', Satna: 'Satna', Dewas: 'Dewas', Ratlam: 'Ratlam',
    Jaipur: 'Jaipur', Jodhpur: 'Jodhpur', Udaipur: 'Udaipur', Kota: 'Kota', Ajmer: 'Ajmer',
    Bikaner: 'Bikaner', Alwar: 'Alwar', Bhilwara: 'Bhilwara', Sikar: 'Sikar', Bharatpur: 'Bharatpur',
    Mumbai: 'Mumbai', Pune: 'Pune', Nagpur: 'Nagpur', Nashik: 'Nashik', Aurangabad: 'Aurangabad',
    Thane: 'Thane', Solapur: 'Solapur', Kolhapur: 'Kolhapur', Ahmednagar: 'Ahmednagar', Satara: 'Satara',
    Kolkata: 'Kolkata', Howrah: 'Howrah', Darjeeling: 'Darjeeling', Murshidabad: 'Murshidabad', Malda: 'Malda',
    Barddhaman: 'Barddhaman', Nadia: 'Nadia', 'North 24 Parganas': 'North 24 Parganas', 'South 24 Parganas': 'South 24 Parganas', Hugli: 'Hugli',
    Bhubaneswar: 'Bhubaneswar', Cuttack: 'Cuttack', Puri: 'Puri', Rourkela: 'Rourkela', Sambalpur: 'Sambalpur',
    Berhampur: 'Berhampur', Balasore: 'Balasore', Bhadrak: 'Bhadrak', Angul: 'Angul', Koraput: 'Koraput',
    Ranchi: 'Ranchi', Jamshedpur: 'Jamshedpur', Dhanbad: 'Dhanbad', Bokaro: 'Bokaro', Deoghar: 'Deoghar',
    Hazaribagh: 'Hazaribagh', Giridih: 'Giridih', Ramgarh: 'Ramgarh', Dumka: 'Dumka', Palamu: 'Palamu',
    Raipur: 'Raipur', Bilaspur: 'Bilaspur', Durg: 'Durg', Korba: 'Korba', Rajnandgaon: 'Rajnandgaon',
    Bhilai: 'Bhilai', Jagdalpur: 'Jagdalpur', Raigarh: 'Raigarh', Dhamtari: 'Dhamtari', Mahasamund: 'Mahasamund',
    Visakhapatnam: 'Visakhapatnam', Vijayawada: 'Vijayawada', Guntur: 'Guntur', Nellore: 'Nellore', Tirupati: 'Tirupati',
    Kakinada: 'Kakinada', Rajahmundry: 'Rajahmundry', Kurnool: 'Kurnool', Anantapur: 'Anantapur', Kadapa: 'Kadapa'
  },
  hi: {
    title: 'MGNREGA जिला प्रदर्शन',
    detectLocation: 'मेरा जिला पता करें',
    chooseDistrict: 'जिला चुनें',
    lastUpdated: 'अंतिम अपडेट',
    month: 'महीना',
    year: 'साल',
    noData: 'कोई डेटा उपलब्ध नहीं',
    refresh: 'डेटा रीफ़्रेश करें',
    loading: 'लोड हो रहा है',
    searchPlaceholder: 'जिला खोजें...',
    noResults: 'कोई जिला नहीं मिला',
    // Month names in Hindi
    Apr: 'अप्रैल',
    May: 'मई',
    Jun: 'जून',
    Jul: 'जुलाई',
    Aug: 'अगस्त',
    Sep: 'सितंबर',
    Oct: 'अक्टूबर',
    Nov: 'नवंबर',
    Dec: 'दिसंबर',
    Jan: 'जनवरी',
    Feb: 'फरवरी',
    Mar: 'मार्च',
    // Stats
    totalJobcards: 'कुल जॉबकार्ड',
    totalWorkers: 'कुल श्रमिक',
    persondays: 'व्यक्ति दिवस उत्पन्न',
    works: 'कार्य पूर्ण',
    expenditure: 'कुल व्यय (₹ लाख)',
    workersLabel: '👷‍♂️ कुल श्रमिक',
    jobcardsLabel: '📋 कुल जॉबकार्ड',
    persondaysLabel: '🧱 कुल कार्य दिवस',
    expenditureLabel: '💰 कुल खर्च (लाख)',
    fromLastYear: 'पिछले साल से',
    monthlyTrend: '📊 मासिक रुझान (Monthly Trend)',
    monthlyComparison: '📈 मासिक तुलना (Monthly Comparison)',
    // Location detection messages
    browserNotSupported: 'आपका ब्राउज़र location detection support नहीं करता। कृपया manually district select करें।',
    locationDenied: 'Location permission denied है। Browser settings में जाकर location permission enable करें।',
    yourLocation: 'आपकी location',
    nearestDistrict: 'सबसे नजदीकी district',
    selectThis: 'क्या यह select करें?',
    addToDatabase: 'क्या इस district को database में add करें?',
    districtName: 'District का नाम',
    stateName: 'State का नाम',
    addingDistrict: 'District database में add हो रहा है...',
    districtAdded: 'District सफलतापूर्वक add हो गया!',
    addFailed: 'District add नहीं हो सका। कृपया फिर से कोशिश करें।',
    // District names in Hindi (Comprehensive list for all states)
    // Existing translations
    Patna: 'पटना', Gaya: 'गया', Muzaffarpur: 'मुजफ्फरपुर', Bhagalpur: 'भागलपुर', Darbhanga: 'दरभंगा',
    Nalanda: 'नालंदा', Rohtas: 'रोहतास', Purnia: 'पूर्णिया', Begusarai: 'बेगूसराय', Siwan: 'सीवान',
    Lucknow: 'लखनऊ', Kanpur: 'कानपुर', Varanasi: 'वाराणसी', Agra: 'आगरा', Allahabad: 'इलाहाबाद',
    Meerut: 'मेरठ', Bareilly: 'बरेली', Aligarh: 'अलीगढ़', Gorakhpur: 'गोरखपुर', Noida: 'नोएडा',
    Bhopal: 'भोपाल', Indore: 'इंदौर', Jabalpur: 'जबलपुर', Gwalior: 'ग्वालियर', Ujjain: 'उज्जैन',
    Sagar: 'सागर', Rewa: 'रीवा', Satna: 'सतना', Dewas: 'देवास', Ratlam: 'रतलाम',
    Jaipur: 'जयपुर', Jodhpur: 'जोधपुर', Udaipur: 'उदयपुर', Kota: 'कोटा', Ajmer: 'अजमेर',
    Bikaner: 'बीकानेर', Alwar: 'अलवर', Bhilwara: 'भीलवाड़ा', Sikar: 'सीकर', Bharatpur: 'भरतपुर',
    Mumbai: 'मुंबई', Pune: 'पुणे', Nagpur: 'नागपुर', Nashik: 'नासिक', Aurangabad: 'औरंगाबाद',
    Thane: 'ठाणे', Solapur: 'सोलापुर', Kolhapur: 'कोल्हापुर', Ahmednagar: 'अहमदनगर', Satara: 'सतारा',
    Kolkata: 'कोलकाता', Howrah: 'हावड़ा', Darjeeling: 'दार्जिलिंग', Murshidabad: 'मुर्शिदाबाद', Malda: 'मालदा',
    Barddhaman: 'बर्धमान', Nadia: 'नदिया', 'North 24 Parganas': 'उत्तर 24 परगना', 'South 24 Parganas': 'दक्षिण 24 परगना', Hugli: 'हुगली',
    Bhubaneswar: 'भुवनेश्वर', Cuttack: 'कटक', Puri: 'पुरी', Rourkela: 'राउरकेला', Sambalpur: 'संबलपुर',
    Berhampur: 'बेरहामपुर', Balasore: 'बालासोर', Bhadrak: 'भद्रक', Angul: 'अंगुल', Koraput: 'कोरापुट',
    Ranchi: 'रांची', Jamshedpur: 'जमशेदपुर', Dhanbad: 'धनबाद', Bokaro: 'बोकारो', Deoghar: 'देवघर',
    Hazaribagh: 'हजारीबाग', Giridih: 'गिरिडीह', Ramgarh: 'रामगढ़', Dumka: 'दुमका', Palamu: 'पलामू',
    Raipur: 'रायपुर', Bilaspur: 'बिलासपुर', Durg: 'दुर्ग', Korba: 'कोरबा', Rajnandgaon: 'राजनांदगांव',
    Bhilai: 'भिलाई', Jagdalpur: 'जगदलपुर', Raigarh: 'रायगढ़', Dhamtari: 'धमतरी', Mahasamund: 'महासमुंद',
    Visakhapatnam: 'विशाखापत्तनम', Vijayawada: 'विजयवाड़ा', Guntur: 'गुंटूर', Nellore: 'नेल्लोर', Tirupati: 'तिरुपति',
    Kakinada: 'काकीनाडा', Rajahmundry: 'राजमुंदरी', Kurnool: 'कुर्नूल', Anantapur: 'अनंतपुर', Kadapa: 'कडपा',
    // Additional districts from screenshot
    Adilabad: 'आदिलाबाद', 'Agar Malwa': 'आगरा मालवा', Ahmedabad: 'अहमदाबाद', Aizawl: 'आइजोल', Akola: 'अकोला',
    Alappuzha: 'अलाप्पुझा', Alipurduar: 'अलीपुरदुआर', Alirajpur: 'अलीराजपुर', Almora: 'अल्मोड़ा',
    Ambala: 'अंबाला', 'Ambedkar Nagar': 'अंबेडकर नगर', Amethi: 'अमेठी', Amravati: 'अमरावती', Amreli: 'अमरेली',
    Amritsar: 'अमृतसर', Amroha: 'अमरोहा', Anand: 'आनंद', Anantpur: 'अनंतपुर', Anantnag: 'अनंतनाग',
    Anjaw: 'अंजॉ', Anuppur: 'अनूपपुर', Araria: 'अररिया', Aravalli: 'अरावली', Ariyalur: 'अरियालुर',
    Arwal: 'अरवल', Ashoknagar: 'अशोकनगर', Auraiya: 'औरैया'
  }
};

let locale = 'hi'; // default to Hindi for rural focus
let listeners = []; // Track components that need re-render

export function t(key) {
  return translations[locale][key] || translations['en'][key] || key;
}

export function setLocale(l) {
  if (translations[l]) {
    locale = l;
    // Notify all listeners (components) to re-render
    listeners.forEach(listener => listener(locale));
  }
}

export function getLocale() { 
  return locale; 
}

// Subscribe to locale changes
export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

export default { t, setLocale, getLocale, subscribe };
