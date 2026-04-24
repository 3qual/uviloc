import { ScrollView, Alert, View, TouchableOpacity, Platform } from "react-native";
import styles from "./bottommenu.style";
import Tracker from "../Tracker/Tracker";
import { useEffect, useRef, useState } from "react";
import { clearError, fetchTrackersByUserToken, resetTrackers } from "../../slices/trackerSlice";
import { getData } from "../../utils/storage";
import { useDispatch, useSelector } from "../../state/store";
import { COLORS, SIZE } from "../../constants";
import { convertUTCToLocalTime, parseCoordinates } from "../../utils/common";
import { calculateDistance } from "../../utils/coordinates";
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import * as Location from 'expo-location';
import CustomText from "../CustomText";
import { setSelectedTracker } from "../../slices/selectedTrackerSlice";
import { registerForPushNotificationsAsync, schedulePushNotification } from "../../utils/notifications"; // Import the refactored function
import * as Notifications from 'expo-notifications';
import { useNavigation } from "expo-router";
import { TrackerType } from "../../types/tracker";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Devices = () => {
    const { trackers, loading, error } = useSelector((state) => state.trackers);
    const userLocation = useSelector((state) => state.location.userLocation);;
    const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false);
    const [notifiedTrackers, setNotifiedTrackers] = useState<Set<number>>(new Set());
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const accessToken = useSelector((state) => state.auth.userData?.access_token );

    // Notifications logic
    
    useEffect(() => {
        registerForPushNotificationsAsync(); // Register for push notifications
    
        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (trackers.length > 0) {
            trackers.forEach(tracker => {
                const lastTimeSeen = new Date(tracker.latest_geolocation.created_at);
                const currentTime = new Date();
                const differenceInMinutes = (currentTime.getTime() - lastTimeSeen.getTime()) / (1000 * 60);
                
                if (differenceInMinutes > 1 && !notifiedTrackers.has(tracker.id)) {
                    schedulePushNotification({
                        title: `Tracker ${tracker.name} Disconnected`,
                        body: `The tracker ${tracker.name} hasn't been seen for over an hour.`,
                        data: { trackerId: tracker.id }
                    });

                    setNotifiedTrackers(prevState => new Set(prevState).add(tracker.id));
                }
            });
        }
    }, [trackers, notifiedTrackers]);

    // Trackers logic

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchTrackersByUserToken({ access_token: accessToken }));

            const intervalId = setInterval(() => {
                dispatch(fetchTrackersByUserToken({ access_token: accessToken }));
            }, 20000);
    
            return () => clearInterval(intervalId);
        }
    }, [accessToken, dispatch]);

    const handleTrackerPress = (tracker: TrackerType) => {
        dispatch(setSelectedTracker({ selectedTrackerId: tracker.id, selectedTrackerName: tracker.name, selectedTrackerCoordinates: tracker.latest_geolocation.coordinates }));
        // @ts-expect-error
        navigation.navigate('trackerDetails', { id: tracker.id, trackerToken: tracker.token});
    }

    // everything else

    useEffect(() => {
        const checkPermissionAndFetchLocation = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') setLocationPermissionDenied(true);
        };

        checkPermissionAndFetchLocation();
    }, []);


    if (locationPermissionDenied) {
        return <CustomText style={{flex: 1, backgroundColor: COLORS.background}}>Permission to access location was denied</CustomText>
    }

    if (loading || !userLocation) {
        return <CustomActivityIndicator style={{ flex: 1 }} size='small' />
    }

    if (error) {
        Alert.alert(
            "Error",
            `Error loading trackers: ${error}`,
            [{ text: "OK", onPress: () => {
                console.log("OK Pressed")
                dispatch(clearError());
            }}],
            { cancelable: false }
        );
    }

    if (trackers.length == 0) {
        return (
            <View style={styles.bottomMenuPage}>
                <CustomText style={{ margin: 'auto' }} color={COLORS.primary} size={SIZE.small}> 
                    You don't have any connected trackers 
                </CustomText>
            </View>
        )
    }

    return (
        <ScrollView style={styles.bottomMenuPage} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
            {trackers.map((tracker, index) => (
                <TouchableOpacity 
                    key={tracker.token} 
                    style={index !== 0 && { marginTop: SIZE.small }}
                    onPress={() => handleTrackerPress(tracker)}
                >
                    <Tracker
                        name={tracker.name}
                        lastTimeSeen={convertUTCToLocalTime(tracker.latest_geolocation.created_at)}
                        location={''}
                        distance={calculateDistance(userLocation, parseCoordinates(`${tracker.latest_geolocation.coordinates}`) )}               
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

export default Devices;
