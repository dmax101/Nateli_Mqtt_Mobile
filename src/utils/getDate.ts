import React from 'react';
import config from '../configs';

function getDate() {
    const dateNow = new Date();
    const { locale } = config;

    const completeDate = {
        date: Number(dateNow.toLocaleDateString(locale, { day: 'numeric' })),
        month: String(dateNow.toLocaleDateString(locale, { month: 'long' })),
        year: Number(dateNow.toLocaleDateString(locale, { year: 'numeric' })),
        weekDay: String(dateNow.toLocaleDateString(locale, { weekday: 'long' })),
    }

    return completeDate;
}

export default getDate;