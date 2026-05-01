
export const LOPRICE_URL = "loprice.co.tz"
export const LOPRICE_URL_S = "https://loprice.co.tz/"
export const LOPRICE_URL_S_P5443 = "https://loprice.co.tz:5443"
export const LOPRICE_API_URL_S = "https://api.loprice.co.tz"
export const LOPRICE_API2_URL_S = "https://api2.loprice.co.tz"
export const LOPRICE_JANUS_URL ="ws://streams.loprice.co.tz:8188/"
export const LOPRICE_JANUS_URL_S ="wss://streams.loprice.co.tz:8989"
export const LOPRICE_JANUS_ICE_SERVER =[{ urls: "stun:loprice.co.tz:3478" }]
export const LOPRICE_API_PRODUCTION_ENV_PUBLIC_KEY = "FLWPUBK-5171e2160a027de04132fb8bae05ec41-X";




//Conversation menu
//Call
export const CALL_STATE_START_CALL = "call"
export const CALL_STATE_CALLING = "calling"
export const CALL_STATE_INCOMMING = "incoming"
export const CALL_STATE_HANGUP = "hangup"
export const CALL_STATE_IDDLE = "iddle"

export const RINGER_STATE_RINGING = "ringing"
export const RINGER_STATE_IDDLE = "iddle"

//Device
export const MIC_ON: string = "micon";
export const MIC_OFF: string = "micoff";
export const REMOTE_MIC_ON: string = "remotemicon";
export const REMOTE_MIC_OFF: string = "remotemicoff";
export const CAMERA_ON: string = "cameraon";
export const CAMERA_OOFF: string = "cameraoff";
export const REMOTE_CAMERA_ON: string = "remotecameraon";
export const REMOTE_CAMERA_OFF: string = "remotecameraoff";

//ui context
export const LOPRICE_UI_CONTEXT_CALL = "call_ui"


//message
export const XMPP_MESSAGE_TYPE_CHAT: string = "chat";



//Residential types
export const RESIDENTIAL_TYPE = [
  {
    value: 'room',
    label: 'Room',
  },
  {
    value: 'house',
    label: 'House',
  },
  {
    value: 'apartment',
    label: 'Apartment'
  },
  {
    value: 'jtbox',
    label: 'JtBox'
  },
    {
    value: 'fremshop',
    label: 'FremShop'
  },
    {
    value: 'shortlist',
    label: 'ShortList'
  },

];

//Room count
export const RESIDENTIAL_ROOMS = [

  {
    value: '1',
    label: 'Room',
  },
  {
    value: '2',
    label: 'Room',
  },
  {
    value: '3',
    label: 'Room'
  },
  {
    value: '4',
    label: 'Room'
  },
    {
    value: '5',
    label: 'Room'
  },
    {
    value: '6',
    label: 'Room'
  },
   {
    value: '7',
    label: 'Room'
  },
   {
    value: '8',
    label: 'Room'
  },

 {
    value: '9',
    label: 'Room'
  },

   {
    value: '10',
    label: 'Room'
  },
];

//Loprice Property Manager Locations
export const GLOBAL_COUNTRIES = [
  { label: 'Tanzania', value: 'TANZANIA' },
  { label: 'Kenya', value: 'KENYA' },
  { label: 'Uganda', value: 'UGANDA' },
  { label: 'Rwanda', value: 'RWANDA' },
  { label: 'Burundi', value: 'BURUNDI' },
  { label: 'Congo DRC', value: 'CONGO DRC' }
];


export const TANZANIA_REGIONS = [
  { label: 'ARUSHA', value: 'ARUSHA' },
  { label: 'DAR-ES-SALAAM', value: 'DAR-ES-SALAAM' },
  { label: 'DODOMA', value: 'DODOMA' },
  { label: 'GEITA', value: 'GEITA' },
  { label: 'IRINGA', value: 'IRINGA' },
  { label: 'KAGERA', value: 'KAGERA' },
  { label: 'KATAVI', value: 'KATAVI' },
  { label: 'KIGOMA', value: 'KIGOMA' },
  { label: 'KILIMANJARO', value: 'KILIMANJARO' },
  { label: 'LINDI', value: 'LINDI' },
  { label: 'MANYARA', value: 'MANYARA' },
  { label: 'MARA', value: 'MARA' },
  { label: 'MBEYA', value: 'MBEYA' },
  { label: 'MOROGORO', value: 'MOROGORO' },
  { label: 'MTWARA', value: 'MTWARA' },
  { label: 'MWANZA', value: 'MWANZA' },
  { label: 'NJOMBE', value: 'NJOMBE' },
  { label: 'PWANI', value: 'PWANI' },
  { label: 'RUKWA', value: 'RUKWA' },
  { label: 'RUVUMA', value: 'RUVUMA' },
  { label: 'SHINYANGA', value: 'SHINYANGA' },
  { label: 'SIMIYU', value: 'SIMIYU' },
  { label: 'SINGIDA', value: 'SINGIDA' },
  { label: 'SONGWE', value: 'SONGWE' },
  { label: 'TABORA', value: 'TABORA' },
  { label: 'TANGA', value: 'TANGA' }
]