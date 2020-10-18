import axios from 'axios';

const apiTest = axios.create({
    /*
        curl \
        -H 'Authorization: Bearer PG4WVUCICSUSXDDKHF76RXPPOOMMOR2V' \
        'https://api.wit.ai/message?v=20200811&q=Ligar%20a%20luz%20da%20garagem'
    */
    baseURL: '192.168.0.105:8080',
  });

export default apiTest;