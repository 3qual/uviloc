import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import { useDispatch, useSelector } from "../../state/store";
import styles from "./map.style";
import { COLORS, MAP_THEME, icons } from "../../constants";
import { convertUTCToLocalTime, formatLastTimeSeen, parseCoordinates } from "../../utils/common";
import { resetSelectedTracker, setSelectedTracker } from "../../slices/selectedTrackerSlice";
import { useNavigation } from "expo-router";
import { TrackerGeolocationType } from "../../types/tracker";

interface MapRegionState {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

const Map = () => {
    const [mapRegion, setMapRegion] = useState<MapRegionState | null>(null);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false);
    const [followsUserLocation, setFollowsUserLocation] = useState<boolean>(false);;
    const mapRef = useRef<MapView>(null);
    const userLocation = useSelector((state) => state.location.userLocation);
    const trackers = useSelector((state) => state.trackers.trackers);
    const selectedTracker = useSelector((state) => state.selectedTracker);

    const [trackerGeolocations, setTrackerGeolocations] = useState<TrackerGeolocationType[]>([]);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const checkPermissionAndFetchLocation = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') setLocationPermissionDenied(true);
        };

        checkPermissionAndFetchLocation();
    }, []);

    useEffect(() => {
        if (selectedTracker.selectedTrackerCoordinates && mapRef.current) {
            if (followsUserLocation) setFollowsUserLocation(false);
            const {latitude, longitude} = parseCoordinates(selectedTracker.selectedTrackerCoordinates);
            mapRef.current.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.02,
            }, 1000);

            const tracker = trackers.find(tracker => tracker.id === selectedTracker.selectedTrackerId);
            if (tracker?.geolocations) {
                setTrackerGeolocations(tracker.geolocations);
            }
        }
    }, [selectedTracker]);

    useEffect(() => {
        if (!mapRegion && userLocation) {
            setMapRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.005,
            });
        }
    }, [userLocation]);

    useEffect(() => {
        if (followsUserLocation && userLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.02,
            }, 1000);
        }
    }, [followsUserLocation, userLocation]);

    const handleToggleFollowUserLocation = () => {
        setFollowsUserLocation(!followsUserLocation);
        // @ts-expect-error
        navigation.navigate('devices');
        setTrackerGeolocations([]);
        dispatch(resetSelectedTracker());
    };

    const handleRegionChangeComplete = () => {
        if (mapRegion && followsUserLocation) animateMapToUserLocation();
    };

    const animateMapToUserLocation = () => {
        if (mapRef.current && userLocation) {
            mapRef.current.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.02,
            }, 1000);
        }
    };

    if (locationPermissionDenied) {
        return null;
    }

    if (!mapRegion) {
        return <CustomActivityIndicator style={{height: '60%'}} size='large' />;
    }

    return (
        <View style={styles.mapContainer}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                region={mapRegion}
                customMapStyle={MAP_THEME}
                showsUserLocation={true}
                userLocationUpdateInterval={10000}
                showsMyLocationButton={false}
                loadingEnabled={true}
                onRegionChangeComplete={handleRegionChangeComplete}
            >
                {trackers.length > 0 && trackers.map((tracker) => (
                    <Marker
                        key={tracker.token}
                        coordinate={parseCoordinates(tracker.latest_geolocation.coordinates)}
                        title={tracker.name}
                    >
                        <icons.tracker
                            height={30}
                            width={30}
                            fill={formatLastTimeSeen(convertUTCToLocalTime(tracker.latest_geolocation.created_at)) === "Now" ? COLORS.accent : COLORS.secondary}
                        />
                    </Marker>
                ))}

                {trackerGeolocations.length > 0 && trackerGeolocations.slice(0, -1).reverse().map((geolocation, index) => (
                    <Marker
                        key={`${geolocation.id}-${index}`}
                        coordinate={parseCoordinates(geolocation.coordinates)}
                        title={`${index + 1}`}
                        description={`Last seen: ${convertUTCToLocalTime(geolocation.created_at)}`}
                    />
                ))}

                
            </MapView>
            <TouchableOpacity 
                style={styles.userFollowButton}
                onPress={handleToggleFollowUserLocation}
            >
                <icons.arrow 
                    style={{transform: [{rotate: followsUserLocation ? '0deg' : '45deg'}]}} 
                    height={20} 
                    width={20} 
                    fill={COLORS.text} 
                    stroke={COLORS.text}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Map
