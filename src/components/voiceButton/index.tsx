import React from 'react';
import { Image, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import info from '../../utils/info';
import verifyMicrophonePermission from '../../services/modules/verifyMicrophonePermission';
import startRecording from '../../services/modules/startRecording';

import voiceButtonIcon from '../../../assets/icon/voiceButton.png';
import styles from './styles';

function VoiceButton() {

    info('voiceButton', 'starting recognition module')

    async function handleVoiceCommandOn() {
        info('event', 'button pressed in')

        if(verifyMicrophonePermission()) {
            startRecording();
        } else {
            info('permissions', 'Ocorreu algum erro ao solicitar permissão para uso do microfone')
        }
    }
    
    async function handleVoiceCommandOff() {
        info('event', 'button pressed off');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
             onPressIn={handleVoiceCommandOn}
             onPressOut={handleVoiceCommandOff}
            >
                <Image source={voiceButtonIcon} resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    )
}

export default VoiceButton;