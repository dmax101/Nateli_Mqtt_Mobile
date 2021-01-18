import axios from 'axios';

const apiTest = axios.create({
    baseURL: '192.168.0.105:8080',
  });

export default apiTest;