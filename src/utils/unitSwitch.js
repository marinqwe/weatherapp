export const unitSwitch = (prevUnits, nextUnits, groupData) => {
    if (prevUnits === '' && nextUnits === 'imperial') {
        groupData.map(obj => {
            let K = parseFloat(obj.main.temp);
            obj.main.temp = Math.round((K - 273.15) * 1.8 + 32);
            return obj.main.temp.toString();
        });
        return groupData;
    } else if (prevUnits === '' && nextUnits === 'metric') {
        groupData.map(obj => {
            let K = parseFloat(obj.main.temp);
            obj.main.temp = Math.round(K - 273.15);
            return obj.main.temp.toString();
        });
        return groupData;
    } else if (prevUnits === 'imperial' && nextUnits === '') {
        groupData.map(obj => {
            let F = parseFloat(obj.main.temp);
            obj.main.temp = Math.round((F - 32) / 1.8 + 273.15);
            return obj.main.temp.toString();
        });
        return groupData;
    } else if (prevUnits === 'imperial' && nextUnits === 'metric') {
        groupData.map(obj => {
            let F = parseFloat(obj.main.temp);
            obj.main.temp = Math.round((F - 32) / 1.8);
            return obj.main.temp.toString();
        });
        return groupData;
    } else if (prevUnits === 'metric' && nextUnits === '') {
        groupData.map(obj => {
            let C = parseFloat(obj.main.temp);
            obj.main.temp = Math.round(C + 273.15);
            return obj.main.temp.toString();
        });
        return groupData;
    } else if (prevUnits === 'metric' && nextUnits === 'imperial') {
        groupData.map(obj => {
            let C = parseFloat(obj.main.temp);
            obj.main.temp = Math.round(C * 1.8 + 32);
            return obj.main.temp.toString();
        });
        return groupData;
    } else if (prevUnits === nextUnits) {
        return groupData;
    }
};
