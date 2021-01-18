import React from 'react';
import config from '../configs';
import moment from 'moment-with-locales-es6';
import info from './info';

function getDate() {

    moment.locale(config.locale[1]);
    
    const completeDate = {
        date: String(moment().format('DD')),
        month: String(moment().format('MMMM')),
        year: String(moment().format('YYYY')),
        weekDay: String(moment().format('dddd')),
    }
    
    info('getDate', `getting moment information`)

    return completeDate;
}

export default getDate;