import React from 'react';
import Speak from './speakService';
import info from '../utils/info';
import mqttSend from '../services/mqttConnector';
import config from "../configs";
import command from './modules/command';

function analysis(content: any) {

    info('wit api', `receiving data from wit api: ${JSON.stringify(content)}`)
    info('wit api', `Message sent: ${JSON.stringify(content['text'])}`)
    const intents = content['intents'];
    const entities = content['entities'];
    const traits = content['traits'];

    console.log('------');
    console.log('Intents: ' + JSON.stringify(intents));
    console.log('Entities: ' + JSON.stringify(entities));
    console.log('Traits: ' + JSON.stringify(traits));
    console.log('------');


    if (intents.length === 0) {
        //Speak('Não entendi. Por favor repita a pergunta');
        Speak('Nops');
    } else {
        switch (intents[0]['name']) {
            case 'chat':
                Speak('Estou aprendendo ainda! Logo irei conversar com você!')
                break;
            case 'check_lights':
                Speak('Checando luzes')
                command();
                break;
            case 'check_temperature':
                Speak('Checando a temperatura')
                break;
            case 'action':
                
                break;
            default:
                break;
        }
    }
}

export default analysis;