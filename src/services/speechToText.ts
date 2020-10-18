import React from 'react';
import info from '../utils/info'
import config from '../configs';
import googleApi from './googleApi';

async function speechToText(file: string) {

    let message = '';

    info('google api', 'Enviando para a api do google')
    //console.log(file);

    const destination = '/speech:recognize?key=' + config.voiceApi.key;
    await googleApi.post(destination,
        {
        "config": {
                "encoding": "LINEAR16",
                "sampleRateHertz": 16000,
                "languageCode": "pt-br"
        },
            "audio": {
                "content": file,
            }
    })
    .then(async (resp) => {
        info('google api', `receiving data: ${JSON.stringify(resp.data)}`);
        
        message = JSON.stringify(resp.data['results'][0]['alternatives'][0]['transcript']);
        
        info('google api', `transcript: ${message}`);
    })
    .catch((error) => {
        info('reading file', 'Cant send the recording', error)
        message = 'Error';
        //return "Error";
    });

    return message;
}

export default speechToText;