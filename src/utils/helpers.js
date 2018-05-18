export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getMaxTemp = array => {
    return array.reduce((max, temp) => (temp.main.temp > max ? temp.main.temp : max), array[0].main.temp);
};

export const getMinTemp = array => {
    return array.reduce((min, temp) => (temp.main.temp < min ? temp.main.temp : min), array[0].main.temp);
};
