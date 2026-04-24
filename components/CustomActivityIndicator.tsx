import { ActivityIndicator, ActivityIndicatorProps, ViewStyle } from "react-native";
import { COLORS } from "../constants";

interface CustomActivityIndicatorProps extends ActivityIndicatorProps{
    style?: ViewStyle;
    size?: 'large' | 'small'; 
}

const CustomActivityIndicator: React.FC<CustomActivityIndicatorProps> = ({ size, style }) => {
    return <ActivityIndicator style={[{backgroundColor: COLORS.background }, style]} size={size} color={COLORS.accent} />;
}

export { CustomActivityIndicator }