import { NativeModules } from 'react-native';
import credentials from '../credentials';

//module.exports = NativeModules.MeuMQTT;

function sendMqttMessage(msg: String, tpc: String) {
    const mqtt = NativeModules.MeuMQTT;
   
    const mqttConfig = credentials.mqttApi;
    const host = mqttConfig.host;
    const port = mqttConfig.port;
    const user = mqttConfig.user;
    const pass = mqttConfig.password;
    const protocol = mqttConfig.protocol;

    mqtt.show(msg, tpc, host, port, user, pass, protocol)
}

export default sendMqttMessage;