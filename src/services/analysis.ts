import React from 'react';
import Speak from './speakService';
import info from '../utils/info';
import mqttSend from '../services/mqttConnector';
import config from "../configs";

function analysis(content: any) {

    info('wit api', `reciving data from wit api: ${JSON.stringify(content)}`)

    if (content['intents'] == '') {
        //Speak('Não entendi. Por favor repita a pergunta');
        Speak('Nops');
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
                        var location = content['entities']['wit$location:location'][0]['value'].slice(0, -1);
                        var device = content['entities']['device:device'][0]['value'];
                        var params = "0000";

                        if ((!(location in config.locations)) || (!(device in config.devices))) {
                            Speak("Dispositivo ou localização inválido");
                        } else {
                            
                            console.log(location);
                            console.log(device);
                            
                            var message = '1' + config.locations[location] + config.devices[device] + params;
                            Speak(location + ': ligando ' + device);
                            mqttSend("1", location + '/' + device);

                            mqttSend(message, "main");
                        }
                    } else {
                        var location = content['entities']['wit$location:location'][0]['value'].slice(0, -1);
                        var device = content['entities']['device:device'][0]['value'];
                        var params = "0000";

                        if ((!(location in config.locations)) || (!(device in config.devices))) {
                            Speak("Dispositivo ou localização inválido");
                        } else {
                            
                            console.log(location);
                            console.log(device);
                            
                            var message = '0' + config.locations[location] + config.devices[device] + params;
                            Speak(location + ': desligando ' + device);
                            mqttSend("0", location + '/' + device);

                            mqttSend(message, "main");
                        }
                    }
                } 
            }
        }
    }
}

export default analysis;