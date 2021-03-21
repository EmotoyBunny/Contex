import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

// css table
import "./CssTable/CommmandList.css"


class CommandList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    delete = (del) => {
        localStorage.removeItem(del);
        let i = 0;
        while (i < this.props.item.playerList.length) {
            alert(this.props.item.playerList.length)
            let players = JSON.parse(localStorage.getItem(this.props.item.playerList[i]));
            let object = {
                name: players.name,
                fullName: players.fullName,
                game: players.game,
                team: "",
                who: "player",
            }
            localStorage.setItem(object.name, JSON.stringify(object))
            i++;
        }
        this.props.getData();
    };


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
                                {this.props.item.game}
                            </React.Fragment>
                        }
                    />
                    <Link to={"/" + this.props.item.name}>
                        <Tooltip title="Узнать больше">
                            <IconButton aria-label="to learn more">
                                <PersonIcon/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Удалить">
                        <IconButton onClick={() => this.delete(this.props.item.name)} aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </ListItem>
            </div>
        );
    }
}

export default CommandList;