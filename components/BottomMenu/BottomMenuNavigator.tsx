import { ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, FONT, SIZE, icons } from "../../constants";
import { Platform, TextStyle } from "react-native";

interface BottomMenuNavigatorProps {
    children: ReactNode;
}

const Tab = createBottomTabNavigator();

const BottomMenuNavigator: React.FC<BottomMenuNavigatorProps> = ({ children }) => {
    const headerTitleStyle = Platform.select<TextStyle>({
        ios: {
            height: 80,
            padding: 0,
            margin: 0,
            fontFamily: FONT.bold,
            fontSize: SIZE.large,
            color: COLORS.text,
        },
        android: {
            height: 65,
            padding: 0,
            margin: 0,
            fontFamily: FONT.bold,
            fontSize: SIZE.large,
            color: COLORS.text,
        },
    });

    return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            headerStyle: {
                height: 50,
                borderBottomWidth: 0.5,
                borderBottomColor: COLORS.secondary,
                backgroundColor: COLORS.background,
                shadowOffset: {
                    width: 0, height: 0
                },
                elevation: 0,
            },
            headerTitleStyle: headerTitleStyle,
            headerTitleAlign: 'left',

            tabBarStyle: {
                borderTopWidth: 0.5,
                borderTopColor: COLORS.secondary,
                backgroundColor: COLORS.background,
                shadowColor: COLORS.background
            },
            tabBarInactiveTintColor: COLORS.text,
            tabBarActiveTintColor: COLORS.accent,
            tabBarLabelStyle: {
                fontFamily: FONT.bold,
            },
            tabBarIcon: ({ focused, size }) => {
                let iconComponent;
                let tabColor = focused ? COLORS.accent : COLORS.text;

                switch(route.name) {
                    case 'devices':
                        iconComponent = <icons.devices width={size} height={size} fill={tabColor} /> 
                        break;
                    case 'profile':
                        iconComponent = <icons.profile width={size} height={size} fill={tabColor} /> 
                        break;
                    default:
                        break;
                }

                return iconComponent;
            },
        })}
    >
        {children}
    </Tab.Navigator>
    )
}

export default BottomMenuNavigator;