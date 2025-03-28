import { MedalData } from "@/config/type";

export const setTotal = (data: MedalData[]):  MedalData[]=> {
    return data.map((item) => {
        const total = item.gold + item.silver + item.bronze;
        return {
            ...item,
            total,
        };
    });
}


const sortByCountryCode = (data: MedalData[]): MedalData[] => {
    return [...data].sort((a, b) => {
        return a.code.localeCompare(b.code);
    });
}

export const assignFlagIndex = (data: MedalData[]): MedalData[] => {
    const sortedDataByCountryCode = sortByCountryCode(data);
    const updatedData = sortedDataByCountryCode.map((item: MedalData, index) => {
        return {
            ...item,
            flagIndex: (index + 1)
        }
    });
    return updatedData;
}
