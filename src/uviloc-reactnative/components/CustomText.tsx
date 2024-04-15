import { Text, TextStyle } from "react-native";
import { COLORS, FONT } from "../constants";
import { ReactNode } from "react";

interface CustomTextProps {
    bold?: boolean;
    style?: TextStyle;
    size?: number; 
    color?: string;
    children: ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ bold, style, size = 14, color = COLORS.text, children }) => {
    const fontFamily = bold ? FONT.bold : FONT.regular;

    return (
        <Text style={[{ fontFamily, color }, style]}>
            {children}
        </Text>
    );
}

export default CustomText;