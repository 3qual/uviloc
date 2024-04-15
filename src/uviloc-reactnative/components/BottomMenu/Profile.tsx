import { Image, StyleSheet, View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { icons } from "../../constants";



const Profile = () => {
	return (
		<View style={styles.bottomMenuPage}>
			<CustomText>
				Profile
			</CustomText>
		</View>
	)
	}

export default Profile;