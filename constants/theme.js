import { Appearance } from "react-native";

const DARK_THEME = {
    text: '#d4d3de',
    background: '#0f0f0f',
    primary: '#545454',
    secondary: '#808080',
    accent: '#acd43d',
    accentRed: '#EA6C6C'
}

const LIGHT_THEME = {
    text: '#22212c',
    background: '#f0f0f0',
    primary: '#ababab',
    secondary: '#808080',
    accent: '#98c02a',
    accentRed: '#921515'
}

const COLORS = Appearance.getColorScheme() === 'dark' ? DARK_THEME : LIGHT_THEME;

const FONT = {
    regular: 'SMRegular',
    bold: 'SMBold'
}

const Z_INDEX = {
    background: 0,

    content_1: 10,
    content_2: 20,
    content_3: 30,
    content_4: 40,
    content_5: 50,

    wrapper: 100,

    modal_1: 200,
    modal_2: 300,
    
    extra_1: 1000,
    extra_2: 2000
}

const SIZE = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};

export { COLORS, FONT, Z_INDEX, SIZE };