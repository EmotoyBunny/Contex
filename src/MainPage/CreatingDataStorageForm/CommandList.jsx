import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';

// css table
import "./CssTable/CommmandList.css"

// components jsx
import AddingCommand from "../AddingCommand";
import {Link} from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";


class CommandList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            edit:false,
        };
    }

    edit = () => {
        this.setState({edit: true})
    }


    handleExpandClick = () => {
        let i = !this.state.expanded;
        this.setState({expanded: i});
    };

    delete = (del) => {
        localStorage.removeItem(del);
        this.props.getData();
    };

    ChooseGameLog = (props) => {
        switch (props) {
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

    showPlayerList=()=>{
        return this.props.item.playerList.map((items) =>
            <Typography paragraph key={items.id}>
                {items.player}
            </Typography>
        );

    }

    edit1 = () => {
        if (this.state.edit === true) {
            return (<AddingCommand name={this.props.item.name} game={this.ChooseGameLog(this.props.item.game)} playerList={this.props.item.playerList}
                                  getData={this.props.getData} what="edit"/>)
        }
    }

    render() {
        return (
            <div>
            <Card className="root">
                <CardHeader
                    title={this.props.item.name}
                    subheader={this.props.item.game}
                />
                <CardMedia
                    className="media"
                    image={this.props.item.img}
                />
                <CardActions disableSpacing>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => this.delete(this.props.item.name)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Redaction">
                        <IconButton onClick={() => this.edit()} aria-label="create">
                            <CreateIcon />
                        </IconButton>
                    </Tooltip>
                    <Link to={"/" + this.props.item.name}>
                        <Tooltip title="To learn more">
                            <IconButton aria-label="to learn more">
                                <PersonIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <IconButton
                        onClick={this.handleExpandClick}
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto">
                    <CardContent>
                        <Typography paragraph>Игроки команды:</Typography>
                        {this.showPlayerList()}
                    </CardContent>
                </Collapse>
            </Card>
                {this.edit1()}
            </div>
        );
    }
}

export default CommandList;