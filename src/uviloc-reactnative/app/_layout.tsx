import { Stack } from "expo-router";
import { useFonts } from "expo-font";

const Layout = () => {
    const [fontsLoaded] = useFonts({
        SMBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
        SMRegular: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='home' options={{ headerShown: false}}/>
        </Stack>
    )
}

export default Layout;