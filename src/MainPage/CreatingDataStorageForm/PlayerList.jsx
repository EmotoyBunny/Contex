import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import PersonIcon from '@material-ui/icons/Person';


// css table
import "./CssTable/PlayerList.css"

// jsx components
import AddingPlayer from "../AddingPlayer";

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
    }

    /**
     * метод удаления данных
     * @param del - ключ удаляемого элемента
     */
    delete = (del) => {
        localStorage.removeItem(del);
        this.props.getData();
    };

    /**
     * Смена состояния edit для последующего вывода метода для редактирования
     */
    edit = () => {
        this.setState({edit: true})
    }

    /**
     * Замена названия игры на её название в хранилице
     * @param props - название игры
     * @returns {string}
     * @constructor
     */
    ChooseGameLog = (props) => {
        switch (props) {
            case "":
                return "";
            case "Call of Duty: Warzone":
                return "call_of_duty";
            case "Counter-Strike: Global Offensive":
                return 'cs_go';
            case "Clash Royale":
                return 'clash_royal';
            case "Dead by Daylight":
                return 'dead_by_daylight';
            case "Dota 2":
                return 'dota_2';
            case "Hearthstone":
                return 'hearthstone';
            case "Heroes of the Storm":
                return 'heroes_of_the_storm';
            case "League of Legends":
                return 'league_of_legends';
            case "Mortal Kombat X":
                return 'mortaL_combat';
            case "Overwatch":
                return 'overwatch';
            case "Quake Champions":
                return 'quake';
            case "Tom Clancy's Rainbow Six Siege":
                return 'rainbow_six_siege';
            case "Rocket League":
                return 'rocket_league';
            case "SMITE":
                return 'smite';
            case "StarCraft II":
                return 'starcraft';
            case "Team Fortress 2":
                return 'team_fortress';
            case "TEKKEN 7":
                return 'tekken7';
            case "VALORANT":
                return 'valorant';
            case "Warface":
                return 'warface';
            case "World of Tanks":
                return 'world_of_tanks';
            default:
        }
    }

    close = () => {
        this.setState({edit: false})
    }

    /**
     * вывод метода редактирования
     * @returns {JSX.Element}
     */
    edit1 = () => {
        if (this.state.edit === true) {
            return (<AddingPlayer name={this.props.item.name} fullName={this.props.item.fullName}
                                  game={this.ChooseGameLog(this.props.item.game)} team={this.props.item.team}
                                  getData={this.props.getData} close={this.close} what="edit"/>)
        }
    }

    render() {
        return (
            <div>
                <Divider variant="inset" component="li"/>
                <ListItem alignItems="flex-start">
                    <Divider variant="inset" component="li"/>
                    <ListItemAvatar>
                        <Avatar variant='rounded' src={this.props.item.img}/>
                    </ListItemAvatar>
                <ListItemText
                    primary={this.props.item.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className="inline"
                                color="textPrimary"
                            >
                                {this.props.item.fullName}
                            </Typography>
                            {" - " + this.props.item.game}
                            <Typography
                                component="span"
                                variant="body2"
                                className="inline"
                                color="textPrimary"
                            >
                                {" - "+this.props.item.team}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <Link to={"/" + this.props.item.name}>
                    <Tooltip title="To learn more">
                        <IconButton aria-label="to learn more">
                            <PersonIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Tooltip title="Delete">
                    <IconButton onClick={() => this.delete(this.props.item.name)} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton onClick={() => this.edit()} aria-label="edit">
                        <CreateIcon/>
                    </IconButton>
                </Tooltip>
            </ListItem>
        <Divider variant="inset" component="li"/>
        {
            this.edit1()
        }
    </div>
    );
    }
    }

    export default PlayerList;