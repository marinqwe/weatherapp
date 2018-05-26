import { getGroupData, getForecastData } from './api';
import { UNITS } from './units';

export const convertTemp = (from, to, amount) => {
    if (from === UNITS.KELVIN && to === UNITS.FAHRENHEIT) {
        amount.map(obj => {
            let K = parseFloat(obj.main.temp);
            obj.main.temp = Math.round((K - 273.15) * 1.8 + 32);
            return obj.main.temp.toString();
        });
        return amount;
    } else if (from === UNITS.KELVIN && to === UNITS.CELSIUS) {
        amount.map(obj => {
            let K = parseFloat(obj.main.temp);
            obj.main.temp = Math.round(K - 273.15);
            return obj.main.temp.toString();
        });
        return amount;
    } else if (from === UNITS.FAHRENHEIT && to === UNITS.KELVIN) {
        amount.map(obj => {
            let F = parseFloat(obj.main.temp);
            obj.main.temp = Math.round((F - 32) / 1.8 + 273.15);
            return obj.main.temp.toString();
        });
        return amount;
    } else if (from === UNITS.FAHRENHEIT && to === UNITS.CELSIUS) {
        amount.map(obj => {
            let F = parseFloat(obj.main.temp);
            obj.main.temp = Math.round((F - 32) / 1.8);
            return obj.main.temp.toString();
        });
        return amount;
    } else if (from === UNITS.CELSIUS && to === UNITS.KELVIN) {
        amount.map(obj => {
            let C = parseFloat(obj.main.temp);
            obj.main.temp = Math.round(C + 273.15);
            return obj.main.temp.toString();
        });
        return amount;
    } else if (from === UNITS.CELSIUS && to === UNITS.FAHRENHEIT) {
        amount.map(obj => {
            let C = parseFloat(obj.main.temp);
            obj.main.temp = Math.round(C * 1.8 + 32);
            return obj.main.temp.toString();
        });
        return amount;
    } else if (from === to) {
        return amount;
    } else {
        throw new Error(`Invalid units for conversion passed, from ${from}, to ${to}`);
    }
};

export const getUnits = () => {
    try {
        const unitSerialized = localStorage.getItem('units');
        const unit = JSON.parse(unitSerialized);

        if (!Object.values(UNITS).includes(unit)) {
            setUnits(UNITS.CELSIUS);
            return UNITS.CELSIUS;
        }
        return unit;
    } catch (error) {
        // if local storage is empty or malformed, it'll probably throw, set it up properly
        throw new Error(error);
    }
};
export const setUnits = unit => {
    if (Object.values(UNITS).includes(unit)) {
        localStorage.setItem('units', JSON.stringify(unit));
    } else {
        throw new Error(`Invalid unit passed: ${unit}`);
    }
};
