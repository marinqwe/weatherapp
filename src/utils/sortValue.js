export const sortByName = groupData => {
    groupData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    return groupData;
};
export const reverseSortByName = groupData => {
    groupData.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
    });
    return groupData;
};
export const sortByTemp = groupData => {
    groupData.sort((a, b) => {
        if (a.main.temp < b.main.temp) return -1;
        if (a.main.temp > b.main.temp) return 1;
        return 0;
    });
    return groupData;
};
export const reverseSortByTemp = groupData => {
    groupData.sort((a, b) => {
        if (a.main.temp < b.main.temp) return 1;
        if (a.main.temp > b.main.temp) return -1;
        return 0;
    });
    return groupData;
};
