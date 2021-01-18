import React from 'react';
import mqttSend from '../mqttConnector';

function command() {
    mqttSend('Preparando envio de comando', 'Status');
}

export default command;