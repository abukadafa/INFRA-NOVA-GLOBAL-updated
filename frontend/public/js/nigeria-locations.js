const nigeriaLocations = {
  "Lagos": {
    lgas: ["Eti-Osa", "Ikeja", "Epe", "Lagos Island", "Surulere", "Apapa", "Alimosho", "Kosofe", "Ikorodu", "Badagry", "Oshodi-Isolo", "Mushin"],
    areas: {
      "Eti-Osa": ["Banana Island", "Ikoyi", "Lekki Phase 1", "Victoria Island", "Ajah", "Chevron Area", "Sangotedo", "VGC"],
      "Ikeja": ["GRA Ikeja", "Allen Avenue", "Opebi", "Maryland", "Computer Village", "Adeniyi Jones"],
      "Epe": ["Epe Town", "Nova Smart Estate Area", "Alaro City Area"],
      "Lagos Island": ["Broad Street", "Marina", "Idumota"],
      "Surulere": ["Adeniran Ogunsanya", "Masha", "Bode Thomas"],
      "Apapa": ["Apapa GRA", "Apapa Port Area"]
    }
  },
  "Abuja (FCT)": {
    lgas: ["Abuja Municipal (AMAC)", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Abaji"],
    areas: {
      "Abuja Municipal (AMAC)": ["Guzape", "Maitama", "Asokoro", "Wuse 2", "Garki", "Jabi", "Utako", "Central Business District", "Garki 2", "Lugbe"],
      "Bwari": ["Gwarinpa", "Kubwa", "Dutse", "Dawaki"]
    }
  },
  "Rivers": {
    lgas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny", "Okrika", "Oyigbo"],
    areas: {
      "Port Harcourt": ["Old GRA", "D-Line", "Diobu", "Township"],
      "Obio-Akpor": ["GRA Phase 2", "Peter Odili Road", "Woji", "Rumuigbo", "Eliozu"]
    }
  },
  "Oyo": {
    lgas: ["Ibadan North", "Ibadan South-West", "Ibadan North-West", "Ogbomosho North", "Akinyele"],
    areas: {
      "Ibadan North": ["Bodija", "Samonda", "Agodi GRA"],
      "Ibadan South-West": ["Ring Road", "Oluyole Estate", "Jericho"]
    }
  },
  "Kano": {
    lgas: ["Kano Municipal", "Nassarawa", "Fagge", "Tarauni", "Gwale"],
    areas: {
      "Nassarawa": ["Nassarawa GRA", "Badawa", "Bompai"],
      "Kano Municipal": ["Kofar Nassarawa", "Sabon Gari"]
    }
  },
  "Delta": {
    lgas: ["Oshimili South", "Warri South", "Uvwie", "Udu", "Sapele"],
    areas: {
      "Oshimili South": ["Asaba GRA", "Okpanam Road"],
      "Uvwie": ["Effurun", "Warri GRA"]
    }
  },
  "Enugu": {
    lgas: ["Enugu North", "Enugu South", "Enugu East", "Nsukka"],
    areas: {
      "Enugu North": ["Independence Layout", "GRA Enugu", "New Haven"]
    }
  },
  "Anambra": {
    lgas: ["Awka South", "Onitsha North", "Onitsha South", "Nnewi North"],
    areas: {
      "Awka South": ["Awka GRA", "Government House Area"],
      "Onitsha North": ["Inland Town", "GRA Onitsha"]
    }
  },
  "Kaduna": {
    lgas: ["Kaduna North", "Kaduna South", "Chikun", "Zaria"],
    areas: {
      "Kaduna North": ["Barnawa", "Malali GRA", "Ungwan Rimi"]
    }
  },
  "Akwa Ibom": {
    lgas: ["Uyo", "Eket", "Ikot Ekpene", "Oron"],
    areas: {
      "Uyo": ["Ewet Housing Estate", "Shelter Afrique", "Uyo GRA"]
    }
  },
  // Add other states for completeness with default placeholders
  "Abia": { lgas: ["Umuahia North", "Aba North", "Aba South", "Ohafia"], areas: {} },
  "Adamawa": { lgas: ["Yola North", "Yola South", "Mubi North"], areas: {} },
  "Bauchi": { lgas: ["Bauchi", "Katagum", "Misau"], areas: {} },
  "Bayelsa": { lgas: ["Yenagoa", "Southern Ijaw", "Brass"], areas: {} },
  "Benue": { lgas: ["Makurdi", "Gboko", "Otukpo"], areas: {} },
  "Borno": { lgas: ["Maiduguri", "Jere", "Biu"], areas: {} },
  "Cross River": { lgas: ["Calabar Municipal", "Calabar South", "Ogoja"], areas: {} },
  "Ebonyi": { lgas: ["Abakaliki", "Afikpo North", "Ezza North"], areas: {} },
  "Edo": { lgas: ["Oredo", "Ikpoba-Okha", "Egor"], areas: {} },
  "Ekiti": { lgas: ["Ado-Ekiti", "Ikere", "Oye"], areas: {} },
  "Gombe": { lgas: ["Gombe", "Akko", "Balanga"], areas: {} },
  "Imo": { lgas: ["Owerri Municipal", "Owerri North", "Orlu"], areas: {} },
  "Jigawa": { lgas: ["Dutse", "Hadejia", "Birnin Kudu"], areas: {} },
  "Katsina": { lgas: ["Katsina", "Daura", "Funtua"], areas: {} },
  "Kebbi": { lgas: ["Birnin Kebbi", "Argungu", "Yauri"], areas: {} },
  "Kogi": { lgas: ["Lokoja", "Okene", "Idah"], areas: {} },
  "Kwara": { lgas: ["Ilorin West", "Ilorin East", "Offa"], areas: {} },
  "Nasarawa": { lgas: ["Lafia", "Karu", "Keffi"], areas: {} },
  "Niger": { lgas: ["Chanchaga", "Bida", "Suleja"], areas: {} },
  "Ogun": { lgas: ["Abeokuta South", "Abeokuta North", "Ijebu Ode", "Ado-Odo/Ota"], areas: {} },
  "Ondo": { lgas: ["Akure South", "Akure North", "Ondo West"], areas: {} },
  "Osun": { lgas: ["Osogbo", "Ilesa East", "Ife Central"], areas: {} },
  "Plateau": { lgas: ["Jos North", "Jos South", "Bukuru"], areas: {} },
  "Sokoto": { lgas: ["Sokoto North", "Sokoto South", "Wamako"], areas: {} },
  "Taraba": { lgas: ["Jalingo", "Wukari", "Sardauna"], areas: {} },
  "Yobe": { lgas: ["Damaturu", "Potiskum", "Gashua"], areas: {} },
  "Zamfara": { lgas: ["Gusau", "Kaura Namoda", "Talata Mafara"], areas: {} }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = nigeriaLocations;
}
