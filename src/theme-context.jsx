import React from "react";

export const themes = {
    light: {
        background: '#eeeeee',
    },
    tomato: {
        background: '#FF6347',
    },
};

export const ThemeContext = React.createContext({
    theme: themes.tomato,
    changeColor: () => {
    },
});