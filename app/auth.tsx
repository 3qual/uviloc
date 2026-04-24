import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT, SIZE } from "../constants";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import CustomText from "../components/CustomText";
import LabeledTextInput from "../components/LabeledTextInput";
import axios from "axios";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { useDispatch } from "../state/store";
import { login } from "../slices/authSlice";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const PrivacyPolicyLink = ({ navigation } : { navigation : NavigationProp<any> })  => {
    return (
        <CustomText 
            style={{
                fontSize: SIZE.xSmall, 
                color: COLORS.secondary,
                textDecorationLine: 'underline',
            }}
            onPress={() => {navigation.navigate('privacy-policy')}}
        >
            privacy policy
        </CustomText>
    )
}

function Auth({ navigation } : { navigation : NavigationProp<any>}) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();

	const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/users/create-or-get/`, {
                "username": username,
				"password": password,
            });
			if (response.data.access_token) {
                const { is_register, ...userData } = response.data;
            
                dispatch(login({userData}));
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'home' }],
                    })
                );

                if (is_register) {
                    Alert.alert("Register", "You're successfully registered!");
                } 
                else {
                    Alert.alert("Login", "You have successfully logged in!");
                }
			} 
			else {
				console.error('Login failed: No access token received');
			}            
        } 
		catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
			}
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View 
            style={{
                marginTop: '10%',
                marginBottom: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '80%',
                maxWidth: 300,
            }}
        >
            <CustomText bold size={SIZE.xxLarge} style={{alignSelf: 'center', marginBottom: '10%'}}>
                Uviloc
            </CustomText>
            <LabeledTextInput 
                label="Username"
                placeholder="Enter your username..."
                onChangeText={setUsername}
                value={username}
            />

            <LabeledTextInput 
                style={{marginTop: SIZE.xSmall}}
                label="Password"
                placeholder="Enter your password..."
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />
            
            <TouchableOpacity
                style={{
                    marginTop: SIZE.xLarge,
                    backgroundColor: COLORS.accent,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                }}
                onPress={handleLogin}
            >
                <CustomText color={COLORS.background}>Register/Login</CustomText>
            </TouchableOpacity>
            <CustomText 
                style={{marginTop: SIZE.xSmall, textAlign: 'center'}}
                size={SIZE.xSmall} 
                color={COLORS.primary}
            >
                By clicking on the Registration/Login button you agree to our <PrivacyPolicyLink navigation={navigation}/>.
            </CustomText>
        </View>
        </SafeAreaView>
    )
}

export default Auth;