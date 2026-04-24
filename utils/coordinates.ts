import { CoordinatesType } from "../types/coordinates";

function calculateDistance(coord1: CoordinatesType, coord2: CoordinatesType): string {
    const R = 6371; // Радиус Земли в километрах
    const lat1 = coord1.latitude;
    const lon1 = coord1.longitude;
    const lat2 = coord2.latitude;
    const lon2 = coord2.longitude;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c * 1000; 

    if (distance < 50) {
        return 'With you';
    }
    else if (distance < 1000) {
        return `${distance.toFixed(0)}m`;
    } 
    else {
        return `${(distance / 1000).toFixed(1)}km`;
    }
}

function deg2rad(deg: number): number {
    return deg * (Math.PI/180);
}

export { calculateDistance }