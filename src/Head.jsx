import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import AppBar from '@material-ui/core/AppBar';
import Container from "@material-ui/core/Container";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ControlCameraOutlinedIcon from '@material-ui/icons/ControlCameraOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

// css table
import "./Head.css"

// components jsx
import MainPage from "./MainPage/PageCommadList";
import AddingCommand from "./MainPage/AddingCommand";
import AddingPlayer from "./MainPage/AddingPlayer";
import MainPagePlayers from "./MainPage/PagePlayersList";
import PassageLocal from "./MainPage/CreatingDataStorageForm/PassageLocal";
import ProfilesPlayer from "./MainPage/CreatingDataStorageForm/ProfilePlayer";
import Tourney from "./MainPage/Tourney";


class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    profilesPlayers = PassageLocal("player").map((item, index) => {
        return (<Route exact path={"/" + item.name} key={index}
                       render={(props) => <ProfilesPlayer {...props} name={item.name} game={item.game} team={item.team}
                                                          link="/playerList" fullName={item.fullName} who="player"/>}/>)
    })

    profilesCommands = PassageLocal("command").map((item, index) => {
        return (<Route exact path={"/" + item.name} key={index}
                       render={(props) => <ProfilesPlayer {...props} name={item.name} game={item.game}
                                                          playerList={item.playerList}
                                                          link="/commandList" who="command"/>}/>)
    })

    editProfileCommands = PassageLocal("command").map((item, index) => {
        return (<Route exact path={"/edit/" + item.name} key={index}
                       render={(props) => <AddingCommand {...props} name={item.name} game={item.game}
                                                         playerList={item.playerList}
                                                         what="edit"/>}/>)
    })


    editProfilePlayers = PassageLocal("player").map((item, index) => {
        return (<Route exact path={"/edit/" + item.name} key={index}
                       render={(props) => <AddingPlayer {...props} name={item.name} game={item.game} team={item.team}
                                                        fullName={item.fullName}
                                                        what="edit"/>}/>)
    })

    render() {
        const customHistory = createBrowserHistory();
        return (
            <Router history={customHistory}>
                <div className="container">
                    <Container maxWidth='md'>
                        <div className="container1">
                            <AppBar position="fixed">
                                <Tabs
                                    aria-label="disabled tabs example"
                                    centered
                                >
                                    <Link to="/">
                                        <Tab label="Главная" icon={<ControlCameraOutlinedIcon/>}/>
                                    </Link>
                                    <Link to="/commandList">
                                        <Tab icon={<PeopleAltOutlinedIcon/>} label="Команды"/>
                                    </Link>
                                    <Link to="/playerList">
                                        <Tab icon={<PersonOutlineOutlinedIcon/>} label="Игроки"/>
                                    </Link>
                                    <Link to="/tourney">
                                        <Tab icon={<WhatshotOutlinedIcon/>} label="Турниры"/>
                                    </Link>

                                </Tabs>
                            </AppBar>
                            <Switch>
                                <Route exact path="/" render={(props) => <MainPage {...props} />}/>
                                <Route exact path="/commandList" render={(props) => <MainPage {...props} />}/>
                                <Route exact path="/addingCommand"
                                       render={(props) => <AddingCommand {...props} what="create"/>}/>
                                <Route exact path="/addingPlayer"
                                       render={(props) => <AddingPlayer {...props} what="create"/>}/>
                                {this.profilesPlayers}
                                {this.profilesCommands}
                                {this.editProfileCommands}
                                {this.editProfilePlayers}
                                <Route exact path="/playerList" render={(props) => <MainPagePlayers {...props}/>}/>
                                <Route exact path="/tourney" component={Tourney}/>
                                <Route path="*" component={MainPage}/>
                            </Switch>
                        </div>
                    </Container>
                </div>
            </Router>

        );
    }
}

export default Head;