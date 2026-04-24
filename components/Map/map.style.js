import { StyleSheet } from "react-native";
import { COLORS, Z_INDEX } from "../../constants";

const styles = StyleSheet.create({
    mapContainer: {
        height: '50%',
        width: '100%',
        backgroundColor: COLORS.background,
        zIndex: Z_INDEX.background,
    },
    userFollowButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: COLORS.background + '80',
        borderRadius: 30,
        padding: 10,
        zIndex: Z_INDEX.content_1,
    },
})

export default styles;