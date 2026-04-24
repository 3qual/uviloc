import React, { useEffect } from "react";
import { ScrollView, Alert, View } from "react-native";
import { COLORS, SIZE, Z_INDEX } from "../../../constants";
import styles from "../bottommenu.style";
import { RouteProp, useRoute } from "@react-navigation/native";
import { clearError, fetchTrackerGeolocationsByUserToken } from "../../../slices/trackerSlice";
import { useDispatch, useSelector } from "../../../state/store"; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomActivityIndicator } from "../../CustomActivityIndicator";
import Tracker from "../../Tracker/Tracker";
import { convertUTCToLocalTime, parseCoordinates } from "../../../utils/common";
import { calculateDistance } from "../../../utils/coordinates";
import CustomText from "../../CustomText";

type TrackerDetailsRouteParams = {
    id: number;
};

const TrackerDetails = () => {
    const route = useRoute<RouteProp<{ params: TrackerDetailsRouteParams }, 'params'>>();
    const { id } = route.params;
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.trackers);
    const userLocation = useSelector((state) => state.location.userLocation);

    const access_token = useSelector((state) => state.auth.userData?.access_token );
    const selectedTracker = useSelector((state) => state.selectedTracker);

    const geolocations = useSelector((state) => {
        const tracker = state.trackers.trackers.find(tracker => tracker.id === id);
        return tracker ? tracker.geolocations : [];
    });

    useEffect(() => {
        if (!access_token) return
        dispatch(fetchTrackerGeolocationsByUserToken({ access_token: access_token }))
    }, [selectedTracker]);

    if (loading || !userLocation) {
        return <CustomActivityIndicator style={{ flex: 1 }} size='small' />
    }

    if (!geolocations || geolocations.length === 1) {
        return (
            <View style={styles.bottomMenuPage}>
                <CustomText style={{ margin: 'auto' }} color={COLORS.primary} size={SIZE.small}> 
                    Tracker has no geolocation history
                </CustomText>
            </View>
        );
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

    return (
        <ScrollView style={styles.bottomMenuPage} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, zIndex: Z_INDEX.content_2 }}>
            {geolocations.slice(0, -1).reverse().map((geolocation, index) => (
                <TouchableOpacity 
                    key={geolocation.id} 
                    style={index !== 0 && { marginTop: SIZE.small }}
                >
                    <Tracker
                        name={`${index + 1}.`}
                        lastTimeSeen={convertUTCToLocalTime(geolocation.created_at)}
                        location={''}
                        distance={calculateDistance(userLocation, parseCoordinates(`${geolocation.coordinates}`) )}               
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default TrackerDetails;
