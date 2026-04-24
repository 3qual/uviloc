import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Devices from "./Devices";
import styles from "./bottommenu.style";
import BottomMenuNavigator from "./BottomMenuNavigator";
import { useNavigation } from "@react-navigation/native";
import { Platform, Pressable, View, ViewStyle } from "react-native";
import { COLORS, icons } from "../../constants";
import Profile from "./Profile";
import TrackerDetails from "./tracker-details/[id]";
import { useSelector } from "../../state/store";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    const navigation = useNavigation();
    const selectedTracker = useSelector((state) => state.selectedTracker);

    const headerRightStyle = Platform.select<ViewStyle>({
        ios: {
            position: 'absolute',
            top: -35,
            right: 10,
        },
        android: {
            position: 'absolute',
            top: -20, 
            right: 10,
        },
    });
    return (
        <View style={styles.bottomMenu} >
            <BottomMenuNavigator>
                <Tab.Screen options={{
                    headerRightContainerStyle: headerRightStyle,
                    headerRight: () => (                    
                        <Pressable 
                            style={{ backgroundColor: 'transparent'}}
                            // @ts-expect-error
                            onPress={() => navigation.navigate('qr-scanner')}
                        >
                            {({ pressed }) => (
                                <icons.plus 
                                    style={{ opacity: pressed ? 0.5 : 1 }}
                                    height={25} 
                                    width={25} 
                                    stroke={COLORS.secondary} 
                                />
                            )}                  
                        </Pressable>
                    ),
                }}
                name='devices' 
                component={Devices} />
                <Tab.Screen name='profile' component={Profile} />
                <Tab.Screen 
                    name='trackerDetails' 
                    component={TrackerDetails} 
                    options={{
                        tabBarButton: () => {return null},
                        headerTitle: selectedTracker.selectedTrackerName
                    }} />
            </BottomMenuNavigator>
        </View>
    )
}

export default BottomMenu;