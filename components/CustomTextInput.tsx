import React from 'react';
import { TextInput, TextInputProps, StyleSheet, TextStyle } from "react-native";
import { COLORS, FONT } from "../constants";

interface CustomTextInputProps extends TextInputProps {
    style?: TextStyle
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({style, ...props}) => {
    return (
        <TextInput
            style={[styles.textInput, style]}
            placeholderTextColor={COLORS.primary}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        fontFamily: FONT.regular,
        color: COLORS.text,
        borderColor: COLORS.secondary,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

export default CustomTextInput;