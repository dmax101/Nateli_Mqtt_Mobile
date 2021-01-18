import React from 'react';
import info from '../../utils/info';
import * as Permissions from 'expo-permissions';

 /**
 * That function verify the microphone permission from device
 * 
 * @returns return true for the permission granted and falso to deny
 */
async function verifyMicrophonePermission() {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    info('permissions', `verifing permition status: ${status}`)

    if (status === 'granted') {
        return true;
    } else {
        return false;
    }
}

export default verifyMicrophonePermission;