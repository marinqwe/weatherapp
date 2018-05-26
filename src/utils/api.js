import api from '../api.json';
import axios from 'axios';


export const getGroupData = (unit) => {
    const url = 'http://api.openweathermap.org/data/2.5/group';
    const id = '2643743,5128581,2950159,1850147,3451190,3369157,3143244,524901,1796236,2172517';
    const APPID = api.key;
    let units = '';
    if(unit === 'kelvin'){
        units = '';
    } else if(unit === 'fahrenheit') {
        units = 'imperial';
    } else if(unit === 'celsius') {
        units = 'metric';
    }
    return axios
        .get(url, {
            params: {
                id,
                units,
                APPID
            }
        })
        .then(res => {
            let data = res.data.list;
            return data;
        })
        .catch(err => {
            console.log(err.response);
        });
};

export const getForecastData = (q, unit) => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast';
    const APPID = api.key;
    return axios
        .get(url, {
            params: {
                q,
                unit,
                APPID
            }
        })
        .then(res => {
            const data = res.data.list;
            const fiveDays = [data[0], data[8], data[16], data[24], data[32]];
            return fiveDays;
        })
        .catch(err => {
            console.log(err);
        });
};
