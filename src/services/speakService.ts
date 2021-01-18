import React from 'react';
import * as Speech from 'expo-speech'; // Talk to user lib
import config from '../configs';
import info from '../utils/info';

function Speak(sentence: string) {
    const { locale, speechOptions } = config;
    
    const options = {
        language: locale[0],
        pitch: speechOptions.pitch,
        rate: speechOptions.rate
    }

    Speech.speak(sentence, options)
    info('speech module', `Speaking: ${sentence}`)    
}

export default Speak;