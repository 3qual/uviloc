import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Home from "./home";
import QrScanner from "./qr-scanner";
import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import { COLORS } from "../constants";
import { Provider } from "react-redux";
import { store } from "../state/store";
import Auth from "./auth";
import PrivacyPolicy from "./privacy-policy";
import { getData } from "../utils/storage";
import { UserData } from "../types/user";

const Stack = createStackNavigator();

const Layout = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [initialPageName, setInitialPageName] = useState<string>('auth');
    const [loaded, error] = useFonts({
        SMBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
        SMRegular: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        const checkToken = async () => {
            const storedUserData = await getData('user_data') as UserData;
            setUserData(storedUserData);
        }

        checkToken();
    }, [])

    useEffect(() => {
        if (userData) setInitialPageName('home');
    }, [userData])

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
    
    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={initialPageName}
            >
                <Stack.Screen name='home' options={{ headerShown: false}} component={Home} />
                <Stack.Screen name='auth' options={{ headerShown: false}} component={Auth} />
                <Stack.Screen 
                    name='privacy-policy' 
                    options={{
                        headerShown: true,
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: COLORS.background,
                            shadowOffset: {
                                width: 0, height: 0
                            },
                            elevation: 0,
                            borderBottomWidth: 0.5,
                            borderBottomColor: COLORS.secondary,
                        },
                        headerTintColor: COLORS.secondary,
                        headerBackTitle: 'Back',
                        presentation: 'modal' 
                    }} 
                    component={PrivacyPolicy} 
                />
                <Stack.Screen 
                    name='qr-scanner'
                    options={{
                        headerShown: true,
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: COLORS.background,
                            shadowOffset: {
                                width: 0, height: 0
                            },
                            elevation: 0,
                            borderBottomWidth: 0.5,
                            borderBottomColor: COLORS.secondary,
                        },
                        headerTintColor: COLORS.secondary,
                        headerBackTitle: 'Back',
                        presentation: 'modal' 
                    }} 
                    component={QrScanner}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default Layout;