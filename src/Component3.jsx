import React from "react";
import {ThemeContext} from './theme-context';
import ThemedButton from "./Component4";

function ThemedPaper() {
    return (
        <ThemeContext.Consumer>
            {({theme, changeColor}) => (
                <div>
                    <h1 style={{color: theme.background}}>Good day</h1>
                    <ThemedButton/>
                </div>
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemedPaper;