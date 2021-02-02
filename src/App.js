import React from "react";

import './App.css';
import {ThemeContext, themes} from './theme-context';
import Content from "./Component2";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themes1: {
        theme: themes.light,
        changeColor: this.changeColor1,
      },
      themes2: {
        theme: themes.light,
        changeColor: this.changeColor2,
      },
      themes3: {
        theme: themes.light,
        changeColor: this.changeColor3,
      }
    };
  }

  changeColor1 = () => {
    this.setState({themes1: {
      ...this.state.themes1, theme: this.state.themes1.theme === themes.dark
              ? themes.light
              : themes.dark,
    }});
  };

  changeColor2 = () => {
    this.setState({themes2: {
        ...this.state.themes2, theme: this.state.themes2.theme === themes.hotPink
            ? themes.light
            : themes.hotPink,
      }});
  };
  changeColor3 = () => {
    this.setState({themes3: {
        ...this.state.themes3, theme: this.state.themes3.theme === themes.tomato
            ? themes.light
            : themes.tomato,
      }});
  };

  render() {
    return (
        <div>
          <ThemeContext.Provider value={this.state.themes1}>
            <Content />
          </ThemeContext.Provider>
          <ThemeContext.Provider value={this.state.themes2}>
            <Content />
          </ThemeContext.Provider>
          <ThemeContext.Provider value={this.state.themes3}>
            <Content />
          </ThemeContext.Provider>
        </div>
    );
  }
}

export default App;
