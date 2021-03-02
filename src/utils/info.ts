import React from 'react';

function info(module: string, message: string, error?: any) {
    const information = `[ ${module} ] -> ${message}`;
    console.log(information);
    error ? console.error(error) : '' ;
}

export default info;