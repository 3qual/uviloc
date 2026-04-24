import { View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZE } from "../../constants";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "../../state/store";
import { logout } from "../../slices/authSlice";
import { useEffect, useState } from "react";
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import { getData } from "../../utils/storage";
import { UserData } from "../../types/user";
import { resetTrackers } from "../../slices/trackerSlice";

const Profile = ({ navigation } : { navigation : NavigationProp<any> }) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const newData = await getData('user_data') as UserData;
            if (newData) {
                setUserData(newData)
            }
        };

        const timer = setTimeout(fetchUserData, 1000);
        return () => clearTimeout(timer);
    }, []);


	const handleLogout = async () => {
        dispatch((logout()));
        dispatch(resetTrackers());
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'auth' }],
            })
        );
    }

    if (!userData) return <CustomActivityIndicator style={{ flex: 1}} />

	return (
		<View style={styles.bottomMenuPage}>
			<CustomText bold>{userData.username}</CustomText>

			<TouchableOpacity
                style={{
					width: '50%',
					maxWidth: 100,
                    marginTop: SIZE.medium,
                    backgroundColor: COLORS.accentRed,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                }}
                onPress={handleLogout}
            >
                <CustomText color={COLORS.background}>Sign out</CustomText>
            </TouchableOpacity>
		</View>
	)
}

export default Profile;