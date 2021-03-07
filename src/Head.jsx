import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Container from "@material-ui/core/Container";


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


export default function Head() {
    const useStyles = makeStyles((theme) => ({
        title: {
            flexGrow: 20,
        },
        root: {
            maxWidth: "md",
        },
    }));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const profilesPlayers = PassageLocal("player").map((item,index) => {
        return (<Route exact path={"/" + item.name} key={index}
                       render={(props) => <ProfilesPlayer {...props} name={item.name} game={item.game} team={item.team}
                                                          link="/playerList" fullName={item.fullName} who="player"/>}/>)
    })

    const profilesCommands = PassageLocal("command").map((item,index) => {
        return (<Route exact path={"/" + item.name} key={index}
                       render={(props) => <ProfilesPlayer {...props} name={item.name} game={item.game} playerList={item.playerList}
                                                          link="/" who="command"/>}/>)
    })


    const StyledMenuItem = withStyles((theme) => ({
        root: {
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                },
            },
        },
    }))(MenuItem);

    const classes = useStyles();

    return (

        <Router>
            <div className="container">
                <Container maxWidth='md'>
                    <div className="container1">
                        <AppBar position="fixed">
                            <Toolbar>
                                <div>
                                    <MenuIcon
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon/>
                                    </MenuIcon>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        onExiting={handleClose}
                                        onClick={handleClose}
                                    >
                                        <Link to="/">
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <SendIcon fontSize="default"/>
                                                </ListItemIcon>
                                                <ListItemText primary="Команды"/>
                                            </StyledMenuItem>
                                        </Link>
                                        <Link to="/playerList">
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <SendIcon fontSize="default"/>
                                                </ListItemIcon>
                                                <ListItemText primary="Игроки"/>
                                            </StyledMenuItem>
                                        </Link>
                                        <Link to="/tourney">
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <SendIcon fontSize="default"/>
                                                </ListItemIcon>
                                                <ListItemText primary="Турниры"/>
                                            </StyledMenuItem>
                                        </Link>
                                    </Menu>
                                </div>
                                <Typography variant="h5" align='center' className={classes.title}>
                                    Команды
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route exact path="/adding_command"
                                   render={(props) => <AddingCommand {...props} what="create"/>}/>
                            <Route exact path="/adding_player"
                                   render={(props) => <AddingPlayer {...props} what="create"/>}/>
                            {profilesPlayers}
                            {profilesCommands}
                            <Route exact path="/playerList" component={MainPagePlayers}/>
                            <Route exact path="/tourney" component={Tourney}/>
                            <Route path="*" component={MainPage}/>
                        </Switch>
                    </div>
                </Container>
            </div>
        </Router>

    );
}