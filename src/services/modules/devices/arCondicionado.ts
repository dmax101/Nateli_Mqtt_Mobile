import React from 'react';
import config from '../../../configs';
import info from '../../../utils/info';
import Speak from '../../speakService';
import mqttSend from '../../mqttConnector';

function arCondicionado(entities:Object, traits:Object,) {
    const std_temp = String(config.devices.ar_condicionado.standard_temperature);
    const unit = config.devices.ar_condicionado.unit;
    const timeout = 5000;

    if ('wit$on_off' in traits) {
        switch (traits['wit$on_off'][0].value) {
            case 'on':
                info('arCondicionado', 'turn on the air conditioning');
                //mqttSend('6', 'smarthouse/arcond'); // ligar ar

                if ('wit$temperature:temperature' in entities) {
                    info('arCondicionado', 'setting custom temperature');
                    let temp = String(entities["wit$temperature:temperature"][0].value || '');

                    if((Number(temp) >= 17) && (Number(temp) <= 30)) {
                        Speak(`Ligando o ar condicionado a ${temp} graus ${unit}`);
                        setTimeout(async () => {
                            await mqttSend(temp, 'smarthouse/arcond'); // definir temperatura
                        }, timeout);
                    } else if(Number(temp) < 17) {
                        Speak(`Ligando o ar condicionado a temperatura mínima de 17 graus ${unit}`);
                        setTimeout(async () => {
                            await mqttSend("17", 'smarthouse/arcond'); // definir temperatura
                        }, timeout);
                    } else if(Number(temp) > 30) {
                        Speak(`Ligando o ar condicionado a temperatura máxima de 30 graus ${unit}`);
                        setTimeout(async () => {
                            await mqttSend("30", 'smarthouse/arcond'); // definir temperatura
                        }, timeout);
                    }
                } else {
                    info('arCondicionado', 'setting standard temperature');
                    Speak(`Ligando o ar condicionado a ${std_temp} graus ${unit}`);
                    setTimeout(async () => {
                        await mqttSend(std_temp, 'smarthouse/arcond'); // definir temperatura
                    }, timeout);
                }
                break;

                case 'off':
                    info('arCondicionado', 'turn off the air conditioning');
                    mqttSend('7', 'smarthouse/arcond'); // desligar ar

                    Speak('Desligando o ar condicionado.');
                    break;
                    
            default:
                Speak('Não entendi.');
                break;
        }
    } else {
        Speak('Não entendi.');
    }
}

export default arCondicionado;