import React from 'react';
import config from '../../configs';
import info from '../../utils/info';
import Speak from '../speakService';
import mqttSend from '../mqttConnector';
import arCondicionado from './devices/arCondicionado';
import cortina from './devices/cortina';
import lampadas from './devices/lampadas';
import rmAccents from 'remove-accents';

function actions(intents: Object, entities: Object, traits: Object) {
    info('actions', 'receiving parameters')

    console.log('------');
    console.log('Intents: ' + JSON.stringify(intents));
    console.log('Entities: ' + JSON.stringify(entities));
    console.log('Traits: ' + JSON.stringify(traits));
    console.log('------');

    let deviceName = '';

    if ('device:device' in entities) {        
        if (entities['device:device'].length > 1) {            
            if('group' in traits) {
                deviceName = rmAccents(traits['group'][0].value);
            } else {
                Speak('Erro!');
            }
            
        } else {
            deviceName = rmAccents(entities['device:device'][0].value.split(' ')[0]);
        }
    } else {
        info('actions', 'no device found')
        Speak('Não existem dispositivos para acionar!')
    }
    
    console.log(deviceName);

    switch (deviceName) {
        case 'ar-condicionado':
            arCondicionado(entities, traits);
            break;
        case 'cortina':
            cortina(entities, traits);
            break;
        case 'lampada':
            console.log('lampidadadasadada');
            
            lampadas(entities, traits);
            break;

        default:
            break;
    }
}

export default actions;