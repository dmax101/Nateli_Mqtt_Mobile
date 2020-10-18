import React from 'react';
import { Image, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

import info from '../../utils/info';

import voiceButtonIcon from '../../../assets/icon/voiceButton.png';
import styles from './styles';
import speechToText from '../../services/speechToText';
import Speak from '../../services/speakService';
import api from '../../services/api';
import config from '../../configs';
import analysis from '../../services/analysis';

import mqttSend from '../../services/mqttConnector';

function VoiceButton() {

    info('system', 'starting recognition module')
    
    Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
    })

    const recordingSettings = {
        android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
        },
        ios: {
            extension: '.wav',
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
            sampleRate: 16000,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,                
        },
    };

    /**
     * That function verify the microphone permission from device
     * 
     * @returns return true for the permission granted and falso to deny
     */
    async function verifyMicrophonePermission() {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        
        info('permissions', `verifing permition status: ${status}`)

        if(status === 'granted') {
            return true;
        } else {
            return false;
        }
    }

    async function startRecording() {
        const recording = new Audio.Recording();
        var uriString = ''
        try {
            await recording.prepareToRecordAsync(recordingSettings);
            await recording.startAsync();

            info('recording', 'Starting recording');

        } catch (error) {
            info('recording', `Can't start Recording: ${error}`);
        }

        setTimeout(async () => {
            info('recording', 'Stopping recording');

            uriString = String(recording.getURI())

            var information = await FileSystem.getInfoAsync(uriString);

            info('recording', `File Info: ${JSON.stringify(information)}`)
   
            await recording.stopAndUnloadAsync()
            .then(async (status) => {
                
                console.log(`
                    Can recording:        ${await status.canRecord},
                    Duration:             ${await status.durationMillis},
                    Is Done Recording:    ${await status.isDoneRecording},
                    Is Recording:         ${await status.isRecording}.
                    `);

                    await FileSystem.readAsStringAsync(uriString,
                        {
                            "encoding": FileSystem.EncodingType.Base64,
                            //"length": length,
                            //"position": 0,
                        })
                        .then(async (file) => {
                            //console.log(file);
                            await speechToText(file)
                                .then(async (response) => {
                                    const params = `/message?v=${config.witApi.v}&q=${response}`;
                                    await api.get(params)
                                        .then((response: { data: any; }) => {
                                            analysis(response.data);
                                        })
                                        .catch((error: any) => {
                                            console.log(error);
                                        });
                                })
                        })
                        .then(async () => {
                            await FileSystem.deleteAsync(uriString, { idempotent: false })
                                .then(() => {
                                    info('file system', 'deleting recording file')
                                })
                                .catch((error) => {
                                    info('file syste', 'Error on deleting audio file!', error)
                                });
                        })
                        .catch((error) => {
                            info('file system', 'Error getting the file recording', error);
                        });
                })
                .catch((error) => {
                    info('recording', 'Error: stopping recording', error);
                })

        }, 6000);
    }

    async function handleVoiceCommandOn() {
        info('event', 'Button pressed in')

        if(verifyMicrophonePermission()) {
            startRecording();
        } else {
            info('permitions', 'Ocorreu algum erro ao solicitar permissão para uso do microfone')
        }
    }
    
    async function handleVoiceCommandOff() {
        info('event', 'Button pressed off');
        mqttSend("ligar", "ventilador")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
             onPressIn={handleVoiceCommandOn}
             //onPressOut={handleVoiceCommandOff}
            >
                <Image source={voiceButtonIcon} resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    )
}

export default VoiceButton;