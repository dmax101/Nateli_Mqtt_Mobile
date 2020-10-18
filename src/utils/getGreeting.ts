import React from 'react';
import info from './info';

function getGreeting() {
    try {
        let greeting = '';
        let hour = new Date().getHours(); //Current Hours
        if (hour >= 0 && hour < 12) {
            greeting = 'Bom dia,';
        } else if (hour < 18) {
            greeting = 'Boa tarde,';
        } else {
            greeting = 'Boa noite,';
        }
        info('greetings', `Getting greetins ${greeting}`)
        
        return greeting;

    } catch (error) {
        info('greetings', "Can't get greeting", error)
        
        return "error"
    }
}

export default getGreeting;