import { StyleSheet } from "react-native";
import { Z_INDEX } from "../../constants";

const styles = StyleSheet.create({
    mapContainer: {
        height: '100%',
        width: '100%',
        zIndex: Z_INDEX.background,
    }
})

export default styles;