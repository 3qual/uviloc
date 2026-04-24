import { StyleSheet } from "react-native";
import { COLORS, Z_INDEX } from "../../constants";

const styles = StyleSheet.create({
    bottomMenu: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        zIndex: Z_INDEX.content_1,
    },
    bottomMenuPage: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
    },
})

export default styles;