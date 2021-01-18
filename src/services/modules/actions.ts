import React from 'react';
import info from '../../utils/info';
import Speak from '../speakService';


function actions(entities:Object, traits:Object) {
    info('service modules: actions', 'Receiving parameters')

    if (traits == null) {
        //Speak('Não entendi. Por favor repita a pergunta');
        Speak('Não entendi. Pergunte novamente!');
    } else {

    }
}