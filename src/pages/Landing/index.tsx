import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { BlurView } from 'expo-blur';

import VoiceButton from '../../components/voiceButton';

import config from '../../configs';

import getGreeting from '../../utils/getGreeting';
import getDate from "../../utils/getDate";

import cloudIcon from '../../../assets/icon/cloudIcon.png';
import styles from './styles';
import info from '../../utils/info';
import getWeather from '../../utils/getWeather';

function Landing() {

    const [weatherTxt, setWeatherTxt] = useState('aguarde...');

    info('system', 'loading landing page');

    getWeather().then(data => {
        let city = JSON.stringify(data.name).slice(1,-1);
        let temp = Math.round(Number(JSON.stringify(data.main.temp)) - 273.15);
        let desc = JSON.stringify(data.weather[0].description).slice(1,-1);
        setWeatherTxt(`${city} - ${temp}° - ${desc}`);
    }).catch(e => {
        console.log(JSON.stringify(e));
        
    });

    const { date, month, weekDay } = getDate();

    return (
        <View style={styles.container}>

            <BlurView intensity={80} style={styles.mainCard}>
                <View style={styles.header}>
                    <View style={styles.right}>
                        <Text style={styles.greetings}>{getGreeting()}</Text>
                        <Text style={styles.name}>{config.name}</Text>
                        <Text style={styles.serverStatusText}>Online</Text>
                    </View>
                    <View style={styles.left}>
                        <Text style={styles.day}>{date}</Text>
                        <Text style={styles.month}>{month}</Text>
                        <Text style={styles.weekDay}>{weekDay}</Text>
                    </View>
                </View>

                <BlurView intensity={80} style={styles.weatherBar}>
                    <Image source={cloudIcon} style={styles.cloudIcon} />
                    <Text style={styles.weatherText}>{weatherTxt}</Text>
                </BlurView>

                <View style={styles.statusBlock}>
                    <Text style={styles.statusTextLabel}>Status</Text>
                    <Text style={styles.statusTextDisplay}>Ouvindo...</Text>
                </View>

            </BlurView>

            <View style={styles.bottonBarGroup}>
                <BlurView style={styles.bottonBar}>
                    <VoiceButton />
                </BlurView>
            </View>
        </View>
    )
}

export default Landing;