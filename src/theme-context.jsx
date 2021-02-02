import React from "react";

export const themes = {
    light: {
        background: '#eeeeee',
    },
    hotPink: {
        background: '#FF69B4',
    },
    tomato: {
        background: '#FF6347',
    },
    dark: {
        background: '#222222',
    },
};

export const ThemeContext = React.createContext({
    theme: themes.dark,
    changeColor: () => {},
});