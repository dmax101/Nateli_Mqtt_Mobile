import React from 'react';
import config from '../configs';
import moment from 'moment';

function getDate() {

    moment().locale(config.locale);
    
    const completeDate = {
        date: String(moment().format('DD')),
        month: String(moment().format('MMMM')),
        year: String(moment().format('YYYY')),
        weekDay: String(moment().format('dddd')),
    }
    return completeDate;
}

export default getDate;