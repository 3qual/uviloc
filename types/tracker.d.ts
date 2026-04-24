interface TrackerType {
    id: number;
    user_username: string;
    token: string;
    sim_phone_number: string | null;
    name: string;
    battery_percentage: number | null;
    signal_strength: number | null;
    net_standart: string | null;
    isp: string | null;
    gps_state: boolean | null;
    speed_kmh: number | null;
    created_at: string;
    updated_at: string;
    latest_geolocation: TrackerGeolocationType;
    geolocations?: TrackerGeolocationType[];
}

interface TrackerGeolocationType {
    id: number;
    tracker_token: string;
    coordinates: string;
    created_at: string;
    updated_at: string;
}

export { TrackerType, TrackerGeolocationType }