import Parse from 'parse';

const PARSE_APPLICATION_ID = 'GlGmGg2fsEXKYf26IY6aElM6ZdXKJIRqWzbVT6MS';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'sxun2XnMVIR7orPAfDcp4Z7KnvyDOdigazDdFhI4';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default Parse;