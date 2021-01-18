import axios from 'axios';
import credentials from '../credentials';

const api = axios.create({
    /*
        curl \
        -H 'Authorization: Bearer PG4WVUCICSUSXDDKHF76RXPPOOMMOR2V' \
        'https://api.wit.ai/message?v=20200811&q=Ligar%20a%20luz%20da%20garagem'
    */
    baseURL: credentials.witApi.baseURL,
    headers: credentials.witApi.headers
  });

export default api;