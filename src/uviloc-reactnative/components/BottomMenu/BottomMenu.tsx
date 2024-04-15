import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Devices from "./Devices";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./bottommenu.style";
import Profile from "./Profile";
import BottomMenuNavigator from "./BottomMenuNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <NavigationContainer independent={true}>
            <SafeAreaView style={styles.bottomMenu} >
                <BottomMenuNavigator>
                    <Tab.Screen name='Devices' component={Devices} />
                    <Tab.Screen name='Profile' component={Profile} />
                </BottomMenuNavigator>
            </SafeAreaView>    
        </NavigationContainer>
    )
}

export default BottomMenu;