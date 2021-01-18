import React from 'react';
import { Audio } from 'expo-av';

const config = {
    name: 'Danilo',
    locale: ['pt-br', 'pt_br'],
    speechOptions: {
        'pitch': 1,
        'rate': 1,
    },
    recordingSettings: {
        android: {
            extension: '.3gpp',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
            sampleRate: 16000,
            numberOfChannels: 1,
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
        }
    },
    devices: {
        luz: '0001',
        som: '0010',
        tv: '0011'
    },
    locations: {
        quarto: '0001',
        sala: '0010',
        cozinha: '0011',
        garagem: '0100'
    }
}

export default config;