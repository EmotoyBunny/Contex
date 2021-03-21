import React, {Component} from "react";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import LoupeIcon from '@material-ui/icons/Loupe';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import IconButton from "@material-ui/core/IconButton";

// css table
import "./CssMainPage/AddingComponent.css"

// jsx components
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import Tooltip from "@material-ui/core/Tooltip";

class AddingCommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            game: "",
            playerList: [],
            correctName: false,
            correctPlayerList: false,
            correctGame: false,
            who: "command",
            key: "",
            count: 0,
            array: [],
            arrayTeam: [],
            players: "",
            correctButton: true
        };
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});

    };

    /**
     * Метод добавления введеных данных команды в localStorage с последующей проверкой
     * на присутствии игрока из полученных данных и уже существующего в localeStorage.
     * Если совпадение найдено, обновляет данные команды этого игрока.
     */
    addItem = () => {
        if (this.state.name === "") {
            this.setState({correctName: true})
            if (this.state.game === "")
                this.setState({correctGame: true})
        } else {
            if (this.state.game === "")
                this.setState({correctGame: true})
            else {
                this.setState({correctGame: false})
                this.setState({correctName: false})
                let i = 0;
                while (i < this.state.playerList.length) {
                    let players = JSON.parse(localStorage.getItem(this.state.playerList[i]));
                    let object = {
                        name: players.name,
                        fullName: players.fullName,
                        game: players.game,
                        team: this.state.name,
                        who: "player",
                    }
                    localStorage.setItem(object.name, JSON.stringify(object))
                    i++;
                }
                const command = {
                    name: this.state.name,
                    game: this.state.game,
                    playerList: this.state.playerList,
                    who: this.state.who
                };
                localStorage.setItem(this.state.name, JSON.stringify(command));
            }
        }
    };


    componentDidMount() {
        if (this.props.what === "edit") {
            this.setState({key: this.props.name}, () => {
                this.setState({
                    name: this.props.name,
                    game: this.props.game,
                    playerList: this.props.playerList,
                });
            });
        }
        this.setState({arrayTeam: PassageLocal("player")});
    }

    /**
     * Метод редактирования данных
     */
    edit = () => {
        localStorage.removeItem(this.state.key);
        this.addItem();
    }

    playerList = () => {
        return this.state.arrayTeam.map((item) => {
            if (this.state.playerList.includes(item.name) === false && JSON.parse(localStorage.getItem(item.name)).team === "")
                return (<option key={item.id} value={item.name}>{item.name}</option>);
            return null;
        });
    }

    /**
     * выбор кнопки для редактирования/добавления
     * @returns {JSX.Element}
     */
    chooseButton = () => {
        if (this.props.what === "create")
            return (
                <Link to="/commandList">
                    <Button variant="contained" color="default" size="large" onClick={this.addItem}>
                        Добавить
                    </Button>
                </Link>
            )
        else
            return (
                <Link to="/commandList">
                    <div className="button">
                        <Button variant="contained" color="default" size="large" onClick={this.edit}>
                            Изменить
                        </Button>
                    </div>
                </Link>
            )
    }

    addingPlayer = () => {
        if (this.state.players !== "") {
            const array = this.state.playerList;
            array.push(this.state.players)
            this.setState({playerList: array, players: ""});
        }
    }

    handleDelete = (del) => {
        const array = this.state.playerList.filter(item => item !== del)
        this.setState({playerList: array});
        let players = JSON.parse(localStorage.getItem(del));
        let object = {
            name: players.name,
            fullName: players.fullName,
            game: players.game,
            team: "",
            who: "player",
        }
        localStorage.setItem(object.name, JSON.stringify(object))
    }


    outPutPlayer = () => {
        const array = this.state.playerList;
        const listItems = array.map((items, index) =>
            <div key={index} className="blockName">
                <Chip
                    icon={<FaceIcon/>}
                    label={items}
                    onDelete={() => this.handleDelete(items)}
                    color="primary"
                    variant="outlined"
                />
            </div>
        );
        return (<div className="blockName">{listItems}</div>);
    };


    render() {
        return (
            <div className="blockAll">
                <div className="blockName">
                    <div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    error={this.state.correctName}
                                    id="outlined-required"
                                    label="Название Команды"
                                    variant="filled"
                                    color="primary"
                                    name="name" value={this.state.name} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockGame">
                    <FormControl required variant="filled">
                        <InputLabel>Игра</InputLabel>
                        <Select
                            native
                            error={this.state.correctGame}
                            value={this.state.game}
                            onChange={this.handleChange}
                            label="Игра"
                            name='game'
                        >
                            <option aria-label="None" value=""/>
                            <option value={"cs_go"}>Counter-Strike: Global Offensive</option>
                            <option value={"call_of_duty"}>Call of Duty: Warzone</option>
                            <option value={"clash_royal"}>Clash Royale</option>
                            <option value={"dead_by_daylight"}>Dead by Daylight</option>
                            <option value={"dota_2"}>Dota 2</option>
                            <option value={"hearthstone"}>Hearthstone</option>
                            <option value={"heroes_of_the_storm"}>Heroes of the Storm</option>
                            <option value={"league_of_legends"}>League of Legends</option>
                            <option value={"mortaL_combat"}>Mortal Kombat X</option>
                            <option value={"overwatch"}>Overwatch</option>
                            <option value={"quake"}>Quake Champions</option>
                            <option value={"rainbow_six_siege"}>Tom Clancy's Rainbow Six Siege</option>
                            <option value={"rocket_league"}>Rocket League</option>
                            <option value={"smite"}>SMITE</option>
                            <option value={"starcraft"}>StarCraft II</option>
                            <option value={"valorant"}>VALORANT</option>
                            <option value={"team_fortress"}>Team Fortress 2</option>
                            <option value={"tekken7"}>TEKKEN 7</option>
                            <option value={"warface"}>Warface</option>
                            <option value={"world_of_tanks"}>World of Tanks</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="blockCommand">
                    <FormControl variant="filled">
                        <InputLabel>Игроки</InputLabel>
                        <Select
                            native
                            className="select"
                            value={this.state.players}
                            onChange={this.handleChange}
                            label="Игроки"
                            name='players'
                        >
                            <option value={this.state.players}>{this.state.players}</option>
                            {this.playerList()}
                        </Select>
                    </FormControl>
                    <Tooltip title="Добавить игрока">
                    <IconButton onClick={() => this.addingPlayer()} aria-label="Добавить">
                        <LoupeIcon/>
                    </IconButton>
                    </Tooltip>
                </div>
                <div className="blockCommand">
                    {this.outPutPlayer()}
                </div>
                <div className="blockButton">
                    {this.chooseButton()}
                </div>
            </div>
        )
    }
}

export default AddingCommand;