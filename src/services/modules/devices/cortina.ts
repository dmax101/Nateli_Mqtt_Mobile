import React from 'react';
import config from '../../../configs';
import info from '../../../utils/info';
import Speak from '../../speakService';
import mqttSend from '../../mqttConnector';

function cortina(entities:Object, traits:Object,) {

    if ('wit$on_off' in traits) {
        switch (traits['wit$on_off'][0].value) {
            case 'on':
                info('cortina', 'opening curtains');
                Speak('Abrindo as cortinas');
                mqttSend('3', 'smarthouse/cortina');
                break;

                case 'off':
                info('cortina', 'closing curtains');
                Speak('Fechando as cortinas');
                mqttSend('2', 'smarthouse/cortina');
                break;
                
            default:
                Speak('Não entendi.');
                break;
        }
    } else {
        Speak('Não entendi.');
    }
}

export default cortina;