import MapView, { Marker } from "react-native-maps";
import styles from "./map.style";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { Text } from "react-native";
import { MAP_THEME } from "../../constants";

interface MapRegionState {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

const Map = () => {
    const [mapRegion, setMapRegion] = useState<MapRegionState>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    })
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false);
    const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

    const fetchCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
            setLocationPermissionDenied(true);
            return;
        }

        let location = await Location.getCurrentPositionAsync({accuracy: Location.LocationAccuracy.BestForNavigation});
        setMapRegion(prevState => ({
            ...prevState,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }));
    };

    useEffect(() => {
        const checkPermissionAndFetchLocation = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') {
                fetchCurrentLocation();
            }
        };

        checkPermissionAndFetchLocation();

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (locationPermissionDenied && locationSubscription) {
            locationSubscription.remove();
        }
    }, [locationPermissionDenied]);

    useEffect(() => {
        if (!locationPermissionDenied) {
            let subscription: Location.LocationSubscription | null = null;
            Location.watchPositionAsync(
                { accuracy: Location.LocationAccuracy.BestForNavigation, timeInterval: 5000, distanceInterval: 10 },
                (location) => {
                    setMapRegion(prevState => ({
                        ...prevState,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }));
                }
            ).then(sub => {
                subscription = sub;
                setLocationSubscription(subscription);
            }).catch(error => {
                setErrorMessage("Failed to start location updates:");
            });

            return () => {
                if (subscription) {
                    subscription.remove();
                }
            };
        }
    }, [locationPermissionDenied]);
    
    if (locationPermissionDenied) {
        return <Text>{errorMessage}</Text>;
    }

    return (
        <MapView style={styles.mapContainer}
            region={mapRegion}
            customMapStyle={MAP_THEME}
            >
        <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} title="You"/>
        </MapView>
    )
}

export default Map;
