import { CoordinatesType } from "../types/coordinates";
import { TimeType } from "../types/time";

const generateRandomString = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      	result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const convertUTCToLocalTime = (utcDateString: string): string | TimeType => {
    const date = new Date(utcDateString);
    const currentTime = new Date();
    const timezoneOffset = date.getTimezoneOffset() / 60; 
    const localDate = new Date(date.getTime() + timezoneOffset);

    const differenceInMinutes = Math.floor((currentTime.getTime() - date.getTime()) / (1000 * 60));

    if (differenceInMinutes < 3) {
        return 'Now';
    }
    else if (differenceInMinutes <= 60) {
        return `${differenceInMinutes}m ago`;
    }
    else if (differenceInMinutes == 60) {
        return '1h ago';
    }

    const time: TimeType = {
        hours: localDate.getHours().toString().padStart(2, '0'),
        minutes: localDate.getMinutes().toString().padStart(2, '0'),
        day: localDate.getDate().toString().padStart(2, '0'),
        month: (localDate.getMonth() + 1).toString().padStart(2, '0'),
        year: localDate.getFullYear().toString()
    };

    return time;
};

const parseCoordinates = (coordinatesString: string): CoordinatesType => {
    const [latitude, longitude] = coordinatesString.split(',');
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
};

const formatLastTimeSeen = (lastTimeSeen: TimeType | string): string => {
    if (typeof lastTimeSeen === 'object') {
        return `${lastTimeSeen.hours}:${lastTimeSeen.minutes} · ${lastTimeSeen.day}.${lastTimeSeen.month}.${lastTimeSeen.year}`;
    } 
    else {
        return lastTimeSeen;
    }
}

export { generateRandomString, convertUTCToLocalTime, parseCoordinates, formatLastTimeSeen };