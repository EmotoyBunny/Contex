import React, {Component} from "react";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// css table
import "./CssMainPage/AddingComponent.css"

// components jsx
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import chooseGameName from "./CreatingDataStorageForm/ChooseGameName";

class AddingPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            game: "",
            team: "",
            correctName: "false",
            fullName: "",
            who: "player",
            arrayTeam: [],
            keyFoName: "",
            keyForTeam: "",
            correctButton: true
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    addItem = () => {
        if (this.state.name === "" || this.state.name.length < 15 || this.state.name.length <= 3) {
            this.setState({correctName: "true"})
        } else
            this.setState({correctName: "false"})
        if (this.state.correctName === "false") {
            const player = {
                name: this.state.name,
                fullName: this.state.fullName,
                game: this.state.game,
                team: this.state.team,
                who: this.state.who
            }
            localStorage.setItem(this.state.name, JSON.stringify(player));
            if (this.state.team !== "") {
                let object = JSON.parse(localStorage.getItem(this.state.team));
                object.playerList.push(this.state.name);
                const command = {
                    name: object.name,
                    game: object.game,
                    playerList: object.playerList,
                    who: "command"
                };
                localStorage.setItem(object.name, JSON.stringify(command));
            }
        }
    };


    componentDidMount() {
        if (this.props.what === "edit") {
            this.setState({keyForName: this.props.name, keyForTeam: this.props.team}, () => {
                this.setState({
                    name: this.props.name,
                    game: this.props.game,
                    team: this.props.team,
                    fullName: this.props.fullName,
                });
            });
        }
        this.setState({arrayTeam: PassageLocal("command")});
    }


    /**
     * Составление списка команд
     * @returns список команд
     */
    commandList = () => {
        return this.state.arrayTeam.map((item) => {
            if (JSON.parse(localStorage.getItem(item.name)).playerList.includes(this.state.name) === false)
                return (<option key={item.id} value={item.name}>{item.name}</option>);
            return null;
        });
    }

    /**
     *Метод редактирования данных
     */
    edit = () => {
        localStorage.removeItem(this.state.key);
        if (this.state.team !== this.state.keyForTeam) {
            let object = JSON.parse(localStorage.getItem(this.state.team));
            const command = {
                name: object.name,
                game: object.game,
                playerList: object.playerList.filter(item => item !== this.state.name),
                who: "command"
            };
            localStorage.setItem(object.name, JSON.stringify(command));
        }
        this.addItem();
    }


    /**
     * выбор кнопки для редактирования/добавления
     * @returns {JSX.Element}
     */
    chooseButton = () => {
        if (this.props.what === "create")
            return (
                <Link to="/playerList">
                    <Button variant="contained" color="default" size="large"
                            onClick={this.addItem}>
                        Добавить
                    </Button>
                </Link>
            )
        else
            return (
                <Link to="/playerList">
                    <Button variant="contained" color="default" size="large" onClick={this.edit}>
                        Изменить
                    </Button>
                </Link>
            )
    }


    render() {
        return (
            <div className="blockAll">
                <div className="blockName">
                    <div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    label="Ваш никнейм"
                                    variant="filled"
                                    name="name" value={this.state.name} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockName">
                    <div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    label="Ваше ФИО"
                                    variant="filled"
                                    name="fullName" value={this.state.fullName} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockGame">
                    <FormControl variant="filled">
                        <InputLabel>Игра</InputLabel>
                        <Select
                            native
                            value={this.state.game}
                            onChange={this.handleChange}
                            label="Игра"
                            name='game'
                        >
                            <option value={this.state.game}>{chooseGameName(this.state.game)}</option>
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
                        <InputLabel>Команда</InputLabel>
                        <Select
                            native
                            className="select"
                            value={this.state.team}
                            onChange={this.handleChange}
                            label="Команда"
                            name='team'
                        >
                            <option value={this.state.team}>{this.state.team}</option>
                            {this.commandList()}
                        </Select>
                    </FormControl>
                </div>
                <div className="blockButton">
                    {this.chooseButton()}
                </div>
            </div>
        )
    }
}

export default AddingPlayer;