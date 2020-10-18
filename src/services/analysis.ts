import React from 'react';
import Speak from './speakService';
import info from '../utils/info';
import mqttSend from '../services/mqttConnector';

function analysis(content: any) {

    info('wit api', `reciving data from wit api: ${JSON.stringify(content)}`)

    if (content['intents'] == '') {
        Speak('Não entendi. Por favor repita a pergunta');
    } else if (content['intents'][0]['name'] == 'greeting') {
        Speak('Olá, como posso ajudar?');
    } else if (content['intents'][0]['name'] == 'location_get') {
        Speak('Estou sendo aperfeiçoada e não sei dizer qual cidade estamos')
    } else if ((content['intents'][0]['name'] == 'weather') || (content['intents'][0]['name'] == 'temperature_get')) {
        Speak('Não sei dizer qual é a temperatura ainda!');
    } else if (content['intents'][0]['name'] == 'action') {
        if (content['traits'] == null) {
            Speak('Não entendi. Pergunte novamente!');
        } else if (content['traits']['wit$on_off']) {
            if (content['entities'] == null) {
                Speak('Não entendi!');
            } else {
                if (content['entities']['wit$location:location'] == null) {
                    Speak('Em qual lugar?');
                } else {
                    if (content['traits']['wit$on_off'][0]['value'] == 'on') {
                        Speak(content['entities']['wit$location:location'][0]['value'] + ': ligando ' + content['entities']['device:device'][0]['value']);
                        mqttSend("1", content['entities']['wit$location:location'][0]['value'] + '/' + content['entities']['device:device'][0]['value']);
                    } else {
                        Speak(content['entities']['wit$location:location'][0]['value'] + ': desligando ' + content['entities']['device:device'][0]['value'])
                        mqttSend("0", content['entities']['wit$location:location'][0]['value'] + '/' + content['entities']['device:device'][0]['value']);
                    }
                } 
            }
        }
    }
}

export default analysis;