import React from "react";

import './App.css';
import {ThemeContext, themes} from './theme-context';
import Content from "./Component2";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light,
            changeColor: this.changeColor,
        };
    }

    changeColor = () => {
        this.setState(state => ({
            theme:
                state.theme === themes.tomato
                    ? themes.light
                    : themes.tomato,
        }));
    };

    createManyContent = () => {
        let i;
        const list = [];
        for (i = 0; i < 500; i++) {
            const listItem = <div className="div1"><Content/></div>;
            list.push(listItem)
        }
        return (list);
    };


    render() {
        return (
            <div>
                <ThemeContext.Provider value={this.state}>
                    {this.createManyContent()}
                </ThemeContext.Provider>
            </div>
        );
    }
}

export default App;
