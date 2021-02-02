import React from "react";
import {ThemeContext} from './theme-context';


function ThemedButton() {
    return (
        <ThemeContext.Consumer>
            {({theme, changeColor}) => (
                <button
                    onClick={changeColor}
                    style={{backgroundColor: theme.background}}>
                    Toggle Theme
                </button>
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemedButton;