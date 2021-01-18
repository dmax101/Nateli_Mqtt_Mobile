import axios from 'axios';

const weatherApi = axios.create({

    baseURL: 'https://api.openweathermap.org/data/2.5/',
  });

export default weatherApi;