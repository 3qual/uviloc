import CustomText from "../components/CustomText";
import { COLORS } from "../constants";
import { View } from "react-native";

function PrivacyPolicy() {
    return (
        <View style={{flex: 1, backgroundColor: COLORS.background, padding: 20}}>
            <CustomText>
                1. User gives his soul to Uviloc
            </CustomText>
        </View>
    )
}

export default PrivacyPolicy;