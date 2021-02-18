import React from 'react';
import config from '../../../configs';
import info from '../../../utils/info';
import Speak from '../../speakService';
import mqttSend from '../../mqttConnector';
import rmAccents from 'remove-accents';

function lampadas(entities:Object, traits:Object,) {

    info('lampadas', 'device: lampada')

    let device;
    let timeout = 5000;

    if ('wit$on_off' in traits) {
        if (entities['device:device'].length > 1) {            
            device = entities['device:device'].map(device => {return device.value})
        } else {
            device = entities['device:device'][0].value;
        }
        console.log(device);

        switch (traits['wit$on_off'][0].value) {
            case 'on':
                if (Array.isArray(device)) {
                    device.map(name => {
                        Speak(`Ligando ${name}`);
                        setTimeout(async () => {
                            mqttSend(name.split(' ')[1], 'smarthouse/lampligar');
                        }, timeout);
                        return info('lampadas', name)
                    })
                } else {
                    if (device.split(' ').length > 1) {
                        Speak(`Ligando ${device}`);
                        mqttSend(device.split(' ')[1], 'smarthouse/lampligar');
                    } else {
                        if (rmAccents(device.split(' ')[0]) == 'lampadas') {
                            const deviceArray = Object.keys(config.devices.lampada);

                            Speak('Ligando todas as lâmpadas');
                            deviceArray.map(name => {
                                setTimeout(() => {
                                    mqttSend(name, 'smarthouse/lampligar');
                                }, timeout);
                            })
                        } else {
                            Speak(`Ligando ${device.split(' ')[0]}`);
                            mqttSend(device.split(' ')[0], 'smarthouse/lampligar');
                        }
                    }
                }
                break;
                case 'off':
                    if (Array.isArray(device)) {
                        device.map(name => {
                            Speak(`Desligando ${name}`);
                            setTimeout(async () => {
                                await mqttSend(name.split(' ')[1], 'smarthouse/lampdesligar');
                            }, timeout);
                            return info('lampadas', name)
                        })
                    } else {
                        if (rmAccents(device.split(' ')[0]) == 'lampadas') {
                            const deviceArray = Object.keys(config.devices.lampada);

                            Speak('Desligando todas as lâmpadas');
                            deviceArray.map(name => {
                                setTimeout(() => {
                                    mqttSend(name, 'smarthouse/lampdesligar');
                                }, timeout);
                            })
                        } else {
                            Speak(`Ligando ${device.split(' ')[0]}`);
                            mqttSend(device.split(' ')[0], 'smarthouse/lampdesligar');
                        }
                    }
                break;
                
            default:
                Speak('Não entendi.');
                break;
        }
    } else {
        Speak('Não entendi.');
    }
}

export default lampadas;