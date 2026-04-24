import { View } from "react-native"
import styles from "./tracker.style"
import CustomText from "../CustomText";
import React from "react";
import { COLORS, SIZE } from "../../constants";
import { TimeType } from "../../types/time";
import { formatLastTimeSeen } from "../../utils/common";

interface TrackerProps {
    name: string,
    lastTimeSeen: TimeType | string,
    location:  string,
    distance: string,
}

const Tracker: React.FC<TrackerProps> = ({ name, lastTimeSeen, location, distance }) => {
    let formattedTime = formatLastTimeSeen(lastTimeSeen);
    let formattedTimeColor = COLORS.secondary;

    if (formattedTime && formattedTime === 'Now') {
        formattedTimeColor = COLORS.accent;
    }

    return (
        <View style={styles.tracker}>
            <View style={styles.trackerInfo}>
                <CustomText bold size={SIZE.large}>{name}</CustomText>
                <View style={{flexDirection: 'row'}}>
                    <CustomText color={formattedTimeColor} size={SIZE.xSmall}>{formattedTime}</CustomText>
                    <CustomText color={COLORS.secondary} size={SIZE.xSmall}>{location}</CustomText>
                </View>
            </View>
            <CustomText>{distance}</CustomText>
        </View>
    )
} 

export default Tracker;