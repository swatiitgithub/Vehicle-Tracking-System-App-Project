import { Image } from "react-native";
import Images from "../utils/Images";
import Colors from "./Colors";

export default {

  // icon List
  // https://oblador.github.io/react-native-vector-icons/  md-search-circle-outline

  PRODUCTION: true,
  IS_DEBUGGER: false,
  LOADER_TEXT: 'Please Wait...',
  USER_NOT_REGISTERED_MSG: 'User is Not Register',
  STORAGE_NAME: {
    COMPANY: 'companyDetails',
    USER: 'userDetails',
    IS_SYNC_DONE: 'isSyncDone'
  },
  USER_DETAILS: {},
  API_REQUEST_METHOD: {
    GET: 'GET',
    POST: 'POST'
  },
  LANGUAGE: [
    { name: 'हिंदी', value: 'hi' },
    { name: 'English', value: 'en' }
  ],
  SETTING:[
    {
      id:"Theme",
      name:"Theme",
      icon:"tint"
    }
  ],
  MENU2: [
    {
      "categoryID": 1,
      "categoryCode": "Report",
      "categoryName": "Report",
      "isActive": true,
      "iconName": 'headphones',
      "isCollapse":false,
      "lstCategorySubCategoryResp": [
        {
          "subCategoryID": 1,
          "categoryID": 1,
          "categoryName": "Report",
          "subCategoryCode": "Vehicle Track",
          "subCategoryName": "Vehicle Track",
          "isActive": true
        },
        {
          "subCategoryID": 2,
          "categoryID": 1,
          "categoryName": "Report",
          "subCategoryCode": "Fuel Consumption",
          "subCategoryName": "Fuel Consumption",
          "isActive": true
        },
        {
          "subCategoryID": 3,
          "categoryID": 1,
          "categoryName": "Report",
          "subCategoryCode": "Vehicle Details Summary",
          "subCategoryName": "Vehicle Details Summary",
          "isActive": true
        },
        {
          "subCategoryID": 4,
          "categoryID": 1,
          "categoryName": "Report",
          "subCategoryCode": "Fuel Consp with Opening",
          "subCategoryName": "Fuel Consp with Opening",
          "isActive": true
        },
        {
          "subCategoryID": 5,
          "categoryID": 1,
          "categoryName": "Report",
          "subCategoryCode": "Fuel Consp without Opening",
          "subCategoryName": "Fuel Consp without Opening",
          "isActive": true
        },
        {
          "subCategoryID": 6,
          "categoryID": 1,
          "categoryName": "Report",
          "subCategoryCode": "Probable wire Tempering",
          "subCategoryName": "Probable wire Tempering",
          "isActive": true
        },
        {
          "subCategoryID": 7,
          "categoryID": 1,
          "categoryName": "Report",
          "subCategoryCode": "Vehicle Not Moved",
          "subCategoryName": "Vehicle Not Moved",
          "isActive": true
        },
      ]
    },
    {
      "categoryID": 2,
      "categoryCode": "TRACKING",
      "categoryName": "TRACKING",
      "isActive": true,
      "iconName": 'truck',
      "lstCategorySubCategoryResp": [
        {
          "subCategoryID": 5,
          "categoryID": 2,
          "categoryName": "TRACKING",
          "subCategoryCode": "Tracking",
          "subCategoryName": "Tracking",
          "isActive": true
        },
        {
          "subCategoryID": 6,
          "categoryID": 2,
          "categoryName": "TRACKING",
          "subCategoryCode": "Kudaghr Location",
          "subCategoryName": "Kudaghr Location",
          "isActive": true
        },
        {
          "subCategoryID": 7,
          "categoryID": 2,
          "categoryName": "TRACKING",
          "subCategoryCode": "Vehicle Travelled",
          "subCategoryName": "Vehicle Travelled",
          "isActive": true
        },
        {
          "subCategoryID": 8,
          "categoryID": 2,
          "categoryName": "TRACKING",
          "subCategoryCode": "Vehicle History",
          "subCategoryName": "Vehicle History",
          "isActive": true
        },
        {
          "subCategoryID": 9,
          "categoryID": 2,
          "categoryName": "TRACKING",
          "subCategoryCode": "GeoFencing",
          "subCategoryName": "GeoFencing",
          "isActive": true
        },
    //   ]
    // },
    // {
    //   "categoryID": 3,
    //   "categoryCode": "MEDICAL",
    //   "categoryName": "MEDICAL",
    //   "isActive": true,
    //   "iconName": 'medkit',
    //   "lstCategorySubCategoryResp": [
    //     {
    //       "subCategoryID": 10,
    //       "categoryID": 3,
    //       "categoryName": "MEDICAL",
    //       "subCategoryCode": "HOSPITAL",
    //       "subCategoryName": "HOSPITAL",
    //       "isActive": true
    //     },
    //     {
    //       "subCategoryID": 11,
    //       "categoryID": 3,
    //       "categoryName": "MEDICAL",
    //       "subCategoryCode": "NURSING HOME",
    //       "subCategoryName": "NURSING HOME",
    //       "isActive": true
    //     },
    //     {
    //       "subCategoryID": 12,
    //       "categoryID": 3,
    //       "categoryName": "MEDICAL",
    //       "subCategoryCode": "CLINIC",
    //       "subCategoryName": "CLINIC",
    //       "isActive": true
    //     },
    //     {
    //       "subCategoryID": 13,
    //       "categoryID": 3,
    //       "categoryName": "MEDICAL",
    //       "subCategoryCode": "PRIVATE DOCTORS",
    //       "subCategoryName": "PRIVATE DOCTORS",
    //       "isActive": true
    //     },
    //     {
    //       "subCategoryID": 14,
    //       "categoryID": 3,
    //       "categoryName": "MEDICAL",
    //       "subCategoryCode": "MEDICAL STORE",
    //       "subCategoryName": "MEDICAL STORE",
    //       "isActive": true
    //     }
      ]
    },
    // {
    //   "categoryID": 4,
    //   "categoryCode": "EDUCATION",
    //   "categoryName": "EDUCATION",
    //   "isActive": true,
    //   "iconName": 'building-o',
    //   "lstCategorySubCategoryResp": [
    //     {
    //       "subCategoryID": 15,
    //       "categoryID": 4,
    //       "categoryName": "EDUCATION",
    //       "subCategoryCode": "UNIVERSITIES",
    //       "subCategoryName": "UNIVERSITIES",
    //       "isActive": true
    //     },
    //     {
    //       "subCategoryID": 16,
    //       "categoryID": 4,
    //       "categoryName": "EDUCATION",
    //       "subCategoryCode": "SCHOOL",
    //       "subCategoryName": "SCHOOL",
    //       "isActive": true
    //     },
    //     {
    //       "subCategoryID": 17,
    //       "categoryID": 4,
    //       "categoryName": "EDUCATION",
    //       "subCategoryCode": "COACHING CENTRE",
    //       "subCategoryName": "COACHING CENTRE",
    //       "isActive": true
    //     },
    //     {
    //       "subCategoryID": 18,
    //       "categoryID": 4,
    //       "categoryName": "EDUCATION",
    //       "subCategoryCode": "PRIVATE TUTORS",
    //       "subCategoryName": "PRIVATE TUTORS",
    //       "isActive": true
    //     }
    //   ]
    // },
   
   
   
    
    
   
  ],
  CITIZEN_SERVICES: [
    {
      id: 26,
      name: 'DashBoard.birthDeath',
      icon: 'registered',
      url: 'https://kmc.up.nic.in/Login_reg.aspx',
    },
    {
      id: 51,
      name: 'DashBoard.propertyTax',
      icon: 'file-text-o',
      url: 'https://knnpropertytax.com/index.php',
    },
    {
      id: 76,
      name: 'DashBoard.jakKalVibhag',
      icon: 'tint',
      url: 'http://jalkalkanpur.in/',
    },
    {
      id: 1,
      name: 'DashBoard.atalIncubation',
      icon: 'money',
      url: 'https://aim.gov.in/selected-atal.php ',
    },
    {
      id: 5,
      name: 'DashBoard.grievance',
      icon: 'comment',
      url: 'https://kmc.up.nic.in/Grievance_Home.htm',
    },
    {
      id: 6,
      name: 'DashBoard.eChallan',
      icon: 'truck',
      url: 'https://echallan.parivahan.gov.in/',
    },
    {
      id: 7,
      name: 'DashBoard.drivingLicense',
      icon: 'drivers-license-o',
      url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do',
    },
    {
      id: 8,
      name: 'DashBoard.vehicleRegistration',
      icon: 'file-picture-o',
      url: 'https://vahan.parivahan.gov.in/vahanservice/vahan/ui/appl_status/form_Know_Appl_Status.xhtml',
    },
  ],
  GOVERNMENT_SCHEMES: [
    {
      id: 1,
      name: 'DashBoard.PMAY',
      icon: 'truck',
      url: 'https://pmaymis.gov.in/open/check_aadhar_existence.aspx?comp=b',
    },
    {
      id: 2,
      name: 'DashBoard.ujjwala',
      icon: 'cubes',
      url: 'https://www.pmuy.gov.in/ujjwala2.html',
    },
    {
      id: 3,
      name: 'DashBoard.scholarship',
      icon: 'file-picture-o',
      url: 'http://samajkalyan.up.gov.in/en/page/application-forms',
    },
    {
      id: 4,
      name: 'DashBoard.PMJAY',
      icon: 'file-o',
      url: 'https://mera.pmjay.gov.in/search/login',
    },

    {
      id: 5,
      name: 'DashBoard.startup',
      icon: 'user',
      url: 'https://www.startupindia.gov.in/content/sih/en/registration.html',
    },
    {
      id: 6,
      name: 'DashBoard.jobRegistration',
      icon: 'gears',
      url: 'https://sewayojan.up.nic.in/IEP/Login.aspx?query=J',
    },
  ],
 
  ABOUT_KANPUR: [
    {
      id: 1,
      name: 'DashBoard.kanpurHistory',
      icon: 'history',
      url: 'https://kanpurnagar.nic.in/history/',
      filter:'Filter1'
    },
    {
      id: 2,
      name: 'DashBoard.KSCL',
      icon: 'asterisk',
      url: 'https://en.wikipedia.org/wiki/New_Kanpur_City',
      filter:'Filter2'
    },
    {
      id: 3,
      name: 'DashBoard.KNN',
      icon: 'city',
      url: 'https://kmc.up.nic.in/',
      filter:'Filter3'
    },

    {
      id: 4,
      name: 'DashBoard.weatherData',
      icon: 'weather-cloudy',
      url: 'https://www.accuweather.com/en/in/kanpur/206679/weather-forecast/206679',
      filter:'Filter4'
    },
    {
      id: 5,
      name: 'DashBoard.pollutionData',
      icon: 'smoke',
      url: 'https://www.accuweather.com/en/in/kanpur/206679/air-quality-index/206679',
      filter:'Filter5'
    },
  ],
  MISC: [
    {
      id: 1,
      name: 'DashBoard.busRoute',
      icon: 'bus-alt',
      url: 'http://uputd.gov.in/article/kanpurctsl-en/bus-timing',
    },
    {
      id: 2,
      name: 'DashBoard.trafficRoute',
      icon: 'traffic-light',
      url: 'https://www.google.com/maps/@26.4499226,80.331871,16z/data=!5m1!1e1',
    },
    
  ],
  CITIZEN_ENGAGEMENT: [
    {
      id: 1,
      name: 'DashBoard.facebook',
      icon: 'facebook',
      url: 'https://www.facebook.com/KanpurMunicipalCorporation/',
      color:Colors.facebook,
    },
    {
      id: 2,
      name: 'DashBoard.twitter',
      icon: 'twitter',
      url: 'https://twitter.com/nagarnigamknp?lang=en',
      color:Colors.twitter,
    },
    {
      id: 3,
      name: 'DashBoard.website',
      icon: 'globe',
      url: 'https://kmc.up.nic.in/',
      color:Colors.blue,
    },
  ],
  POPULATION_DATA: [
    {
      id: 1,
      name: 'DashBoard.population',
      icon: 'intersex',
      url: 'https://kanpurnagar.nic.in/demography/#Demography',
      data: '4581 K',
    },
    {
      id: 2,
      name: 'DashBoard.population',
      icon: 'male',
      url: 'https://kanpurnagar.nic.in/demography/',
      data: '2460 K',
    },
    {
      id: 3,
      name: 'DashBoard.population',
      icon: 'female',
      url: 'https://kanpurnagar.nic.in/demography/',
      data: '2121 K',
    },
  ],
  GREEN_PARK_IMAGES: [
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW1).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW2).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW3).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW4).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW5).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW6).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW7).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW8).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW9).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.GREENPARK_IMAGE_VIEW10).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW1).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW2).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW3).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW4).uri,
    },
  ],
  NANA_RAO_PARK: [
    {
      uri: Image.resolveAssetSource(Images.NANARAO_PARK1).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.NANARAO_PARK2).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.NANARAO_PARK3).uri,
    },
    
  ],
  CONVENTION_CENTRE: [
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW11).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW12).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW13).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW14).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW15).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW16).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW17).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW18).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW19).uri,
    },
    {
      uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW20).uri,
    },
  ],
  MENU: [
    {
      name: 'DashBoard.notification',
      icon: 'bell',
    },
    {
      name: 'DashBoard.changePassword',
      icon: 'pencil',
    },
    {
      name: 'DashBoard.SETTING',
      icon: 'gear',
    },
    {
      name: 'DashBoard.LANGUAGE',
      icon: 'language',
    },
  ],
 
 
  METRO: [
    {
      id: 1,
      name: "Metro Services",
      url: 'https://www.lmrcl.com/kanpur-metro/station-info'
    }
  ],

  OTHER_MENU_OPTION: [
    {
      categoryID: 0,
      categoryCode: "GOVERNMENT_SCHEMES",
      categoryName: "SideBar.GOVERNMENT_SCHEMES",
      isActive: true,
      isCollapse: true,
      iconName: 'headphones',
      lstCategorySubCategoryResp: [
        {
          id: 1,
          name: 'DashBoard.PMAY',
          icon: 'truck',
          url: 'https://pmaymis.gov.in/open/check_aadhar_existence.aspx?comp=b',
        },
        {
          id: 2,
          name: 'DashBoard.ujjwala',
          icon: 'cubes',
          url: 'https://www.pmuy.gov.in/ujjwala2.html',
        },
        {
          id: 3,
          name: 'DashBoard.scholarship',
          icon: 'file-picture-o',
          url: 'http://samajkalyan.up.gov.in/en/page/application-forms',
        },
        {
          id: 4,
          name: 'DashBoard.PMJAY',
          icon: 'file-o',
          url: 'https://mera.pmjay.gov.in/search/login',
        },

        {
          id: 5,
          name: 'DashBoard.startup',
          icon: 'user',
          url: 'https://www.startupindia.gov.in/content/sih/en/registration.html',
        },
        {
          id: 6,
          name: 'DashBoard.jobRegistration',
          icon: 'gears',
          url: 'https://sewayojan.up.nic.in/IEP/Login.aspx?query=J',
        },
      ]
    },
    // {
    //   categoryID: 0,
    //   categoryCode: "CITIZEN SERVICES",
    //   categoryName: "SideBar.CITIZEN_SERVICES",
    //   isActive: true,
    //   isCollapse: true,
    //   iconName: 'headphones',
    //   lstCategorySubCategoryResp: [
    //     {
    //       id: 1,
    //       name: 'DashBoard.birthDeath',
    //       icon: 'registered',
    //       url: 'https://kmc.up.nic.in/Login_reg.aspx',
    //     },
    //     {
    //       id: 2,
    //       name: 'DashBoard.propertyTax',
    //       icon: 'file-text-o',
    //       url: 'https://knnpropertytax.com/index.php',
    //     },
    //     {
    //       id: 3,
    //       name: 'DashBoard.jakKalVibhag',
    //       icon: 'tint',
    //       url: 'http://jalkalkanpur.in/',
    //     },
    //     {
    //       id: 4,
    //       name: 'DashBoard.atalIncubation',
    //       icon: 'money',
    //       url: 'https://aim.gov.in/selected-atal.php ',
    //     },
    //     {
    //       id: 5,
    //       name: 'DashBoard.grievance',
    //       icon: 'comment',
    //       url: 'https://kmc.up.nic.in/Grievance_Home.htm',
    //     },
    //     {
    //       id: 6,
    //       name: 'DashBoard.eChallan',
    //       icon: 'truck',
    //       url: 'https://echallan.parivahan.gov.in/',
    //     },
    //     {
    //       id: 7,
    //       name: 'DashBoard.drivingLicense',
    //       icon: 'drivers-license-o',
    //       url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do',
    //     },
    //     {
    //       id: 8,
    //       name: 'DashBoard.vehicleRegistration',
    //       icon: 'file-picture-o',
    //       url: 'https://vahan.parivahan.gov.in/vahanservice/vahan/ui/appl_status/form_Know_Appl_Status.xhtml',
    //     },
    //   ]
    // },
  ],

 
    
   

 
 


};


