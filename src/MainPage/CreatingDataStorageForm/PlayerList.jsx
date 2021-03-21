import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from '@material-ui/icons/Person';


// css table
import "./CssTable/PlayerList.css"


class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * метод удаления данных
     * @param del - ключ удаляемого элемента
     */
    delete = (del) => {
        localStorage.removeItem(del);
        if(this.props.item.team!=="") {
            let object = JSON.parse(localStorage.getItem(this.props.item.team));
            const command = {
                name: object.name,
                game: object.game,
                playerList: object.playerList.filter(item => item !== del),
                who: "command"
            };
            localStorage.setItem(object.name, JSON.stringify(command));
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
                            <PersonIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Tooltip title="Удалить">
                    <IconButton onClick={() => this.delete(this.props.item.name)} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </ListItem>
        <Divider variant="inset" component="li"/>
    </div>
    );
    }
    }

    export default PlayerList;