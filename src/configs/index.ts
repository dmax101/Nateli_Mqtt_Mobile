import React from 'react';

const config = {
    name: 'Danilo',
    locale: 'pt-br',
    speechOptions: {
        'pitch': 1,
        'rate': 1,
    },
    voiceApi: {
        key: 'AIzaSyCA5DIUidjFMQlpjmF8SrXQMWs1x1f9CWQ'
    },
    witApi: {
        baseURL: 'https://api.wit.ai',
        headers: {
            Authorization: 'Bearer PG4WVUCICSUSXDDKHF76RXPPOOMMOR2V'
        },
        v: '20200728',
    },
    mqttApi: {
        host: 'csilab-broker.inatel.br',
        port: "8883",
        user: 'csilab',
        password: 'WhoAmI#2020',
        protocol: 'ssl'
    },
    devices: {
        luz: '0001',
        som: '0010',
        tv: '0011'
    },
    locations: {
        quarto: '0001',
        sala: '0010',
        cozinha: '0011',
        garagem: '0100'
    }
}

export default config;