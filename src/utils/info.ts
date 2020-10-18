import React from 'react';

function info(location: string, message: string, error?: any) {
    const information = `[ ${location} ] -> ${message}`;
    console.log(information);
    error ? console.log(error) : '' ;
}

export default info;