import { StyleSheet } from "react-native";
import { COLORS, Z_INDEX } from "../../constants";

const styles = StyleSheet.create({
    tracker: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    trackerInfo: {
        flexDirection: 'column'
    }
})

export default styles;