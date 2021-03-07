import React from "react";

import './App.css';

import Head from "./Head";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div>
                <Head/>
            </div>
        );
    }
}

export default App;
