const API_KEY = 'edfAZw3PzU10l6NH9JtaeCS0MDNoXY1X';
const BASE_API = 'https://api.apilayer.com';

const REQUEST_HEADERS = {
  headers: {
    apiKey: API_KEY
  }
}
const fixerApi = (url) => `${BASE_API}/fixer/${url}`;

const API = {
  CURRENCY: {
    convert: (to, from, amount) => fixerApi(`convert?to=${to}&from=${from}&amount=${amount}`),
    symbols: fixerApi('symbols'),
  }
};

export {
  REQUEST_HEADERS,
  API
}


