import React, {Component} from "react";
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
            correctName: false,
            correctFullName: false,
            fullName: "",
            who: "player",
            arrayTeam: [],
            key: ""
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    addItem = () => {
        if (this.state.name === "")
            this.setState({correctName: true})
        else
            this.setState({correctName: false})

        if (this.state.correctName === false && this.state.correctFullName === false) {
            const player = {
                name: this.state.name,
                fullName: this.state.fullName,
                game: this.state.game,
                team: this.state.team,
                who: this.state.who
            }
            localStorage.setItem(this.state.name, JSON.stringify(player));
            if (this.state.team !== "") {
                let array = JSON.parse(localStorage.getItem(this.state.team));
                array.playerList.push({id: array.playerList.length - 1, player: this.state.name});
                localStorage.setItem(this.state.team, JSON.stringify(array));
            }
        }
        this.setState({
            name: "",
            game: "",
            team: "",
            correctName: false,
            correctFullName: false,
            fullName: "",
            who: "player",
            arrayTeam: [],
            key: ""
        })
    };


    componentDidMount() {
        if (this.props.what === "edit") {
            this.setState({key: this.props.name}, () => {
                this.setState({
                    name: this.props.name,
                    game: this.props.game,
                    team: this.props.team,
                    fullName: this.props.fullName,
                });
            });
        }
        this.update();
    }


    update = () => {
        if (this.state.name !== "1") {
            this.setState({yes_no: true});
        } else
            this.setState({yes_no: false});
        this.setState({arrayTeam: PassageLocal("command")});
    }

    /**
     * Составление списка команд
     * @returns список команд
     */
    commandList = () => {
        return this.state.arrayTeam.map((item) =>
            <option key={item.id} value={item.name}>{item.name}</option>
        );
    }

    /**
     *Метод редактирования данных, где ввиде props.getData() принимается метод для обновления состояния
     */
    edit = () => {
        localStorage.removeItem(this.state.key);
        this.addItem();
        this.props.getData();
    }


    /**
     * выбор кнопки для редактирования/добавления
     * @returns {JSX.Element}
     */
    chooseButton = () => {
        if (this.props.what === "create")
            return (
                <Button variant="contained" color="default" size="large" onClick={this.addItem}>
                    Добавить
                </Button>
            )
        else
            return (
                <div className="doubleBlockButton">
                    <div className="button">
                        <Button variant="contained" color="default" size="large" onClick={this.edit}>
                            Изменить
                        </Button>
                    </div>
                    <div className="button">
                        <Button onClick={() => this.props.close()} variant="contained" color="default" size="large">
                            Закрыть
                        </Button>
                    </div>
                </div>
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
                                    error={this.state.correctName}
                                    id="outlined-required"
                                    label="Ваш никнейм"
                                    variant="outlined"
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
                                    error={this.state.correctFullName}
                                    id="outlined-required"
                                    label="Ваше ФИО"
                                    variant="outlined"
                                    name="fullName" value={this.state.fullName} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockGame">
                    <FormControl variant="outlined">
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
                    <FormControl variant="outlined">
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