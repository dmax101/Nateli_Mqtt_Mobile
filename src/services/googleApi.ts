import axios from 'axios';

const googleApi = axios.create({

    baseURL: 'https://speech.googleapis.com/v1',
  });

export default googleApi;