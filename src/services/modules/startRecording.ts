import React from 'react';
import { Audio } from 'expo-av';
import config from '../../configs';
import info from '../../utils/info';
import * as FileSystem from 'expo-file-system';
import speechToText from '../../services/speechToText';
import credentials from '../../credentials';
import api from '../../services/api';
import analysis from '../analysis';
import Speak from '../../services/speakService';

async function startRecording() {

    Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
    })

    const recording = new Audio.Recording();
    var uriString = ''
    try {
        await recording.prepareToRecordAsync(config.recordingSettings);
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
                                if (response != '') {
                                    const params = `/message?v=${credentials.witApi.v}&q=${response}`;
                                    await api.get(params)
                                        .then((response) => {
                                            analysis(response.data);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        }
                                    );
                                } else {
                                    Speak('Ocorreu algum erro!')
                                }
                            })
                    })
                    .then(async () => {
                        await FileSystem.deleteAsync(uriString, { idempotent: false })
                            .then(() => {
                                info('file system', 'deleting recording file')
                            })
                            .catch((error) => {
                                info('file system', 'Error on deleting audio file!', error)
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

export default startRecording;