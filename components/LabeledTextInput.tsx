import React from 'react';
import { View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";

interface LabeledTextInputProps {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;
    value?: string;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    textInputStyle?: TextStyle;
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
    label= '',
    placeholder = '',
    secureTextEntry = false,
    onChangeText = () => null,
    value,
    style,
    labelStyle,
    textInputStyle
}) => {
    return (
        <View style={style}>
            <CustomText style={labelStyle}>{label}</CustomText>
            <CustomTextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={ textInputStyle}
            />
        </View>
    );
};

export default LabeledTextInput;
