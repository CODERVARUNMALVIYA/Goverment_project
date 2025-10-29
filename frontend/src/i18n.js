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
    // District names in Hindi
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
    Kakinada: 'काकीनाडा', Rajahmundry: 'राजमुंदरी', Kurnool: 'कुर्नूल', Anantapur: 'अनंतपुर', Kadapa: 'कडपा'
  }
};

let locale = 'hi'; // default to Hindi for rural focus

export function t(key) {
  return translations[locale][key] || translations['en'][key] || key;
}

export function setLocale(l) {
  if (translations[l]) locale = l;
}

export function getLocale() { return locale; }

export default { t, setLocale, getLocale };
