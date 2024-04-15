import { View } from "react-native";
import BottomMenu from "../components/BottomMenu/BottomMenu";
import Map from "../components/Map/Map";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    return (
        <View style={{backgroundColor: COLORS.background, flex: 1}}>
            <Map />
            <BottomMenu />
        </View>
    )
}

export default Home;
