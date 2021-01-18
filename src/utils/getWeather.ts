import React from 'react';
import * as Location from 'expo-location';
import info from './info';
import weatherApi from '../services/weatherApi';
import credentials from '../credentials';
import config from '../configs';

function getWeather() {
    return new Promise(async (resolve, reject) => {
        info('getWeather', 'requesting weather information');

        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            info('getWeather', 'permission to access location was denied');
            reject({});
        } else {
            info('getWeather', 'getting location');

            let location = await Location.getCurrentPositionAsync({});

            const params =
                `weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${credentials.weather.key}&lang=${config.locale[1]}`;

            let weather = {};

            await weatherApi.get(params)
                .then((response) => {
                    info('getWeather', `getting weather information`);
                    weather = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    weather = {};
                })
                .finally(() => {
                    resolve(weather);
                });
        }
    })
}

export default getWeather;