import React, {Component} from "react";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// css table
import "./CssMainPage/AddingComponent.css"

// jsx components
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import Typography from "@material-ui/core/Typography";

class AddingCommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            game: "",
            playerList: "",
            correctName: false,
            correctPlayerList: false,
            correctGame: false,
            who: "command",
            key: "",
            count: 0,
            array: [],
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
        }
        else {
            if (this.state.game === "")
                this.setState({correctGame: true})
            else
            {
                this.setState({correctGame: false})
                this.setState({correctName: false})
                let array = this.state.playerList.split(' ');
                let players = PassageLocal("player");
                let j = 0;
                let i = 0;
                let array1 = [];
                while (i < players.length) {
                    while (j < array.length) {
                        if (players[i].name === array[j]) {
                            let object = {
                                name: players[i].name,
                                game: players[i].game,
                                team: this.state.name,
                                fullName: players[i].fullName,
                                who: "player",
                            }
                            localStorage.setItem(players[i].name, JSON.stringify(object))
                        }
                        let object1 = {id: j, player: array[j]};
                        array1.push(object1);
                        j++;
                    }
                    i++;
                }
                const command = {
                    name: this.state.name,
                    game: this.state.game,
                    playerList: array1,
                    who: this.state.who
                };
                let commandList = JSON.stringify(command);
                localStorage.setItem(this.state.name, commandList);
                this.setState({
                    name: "",
                    game: "",
                    playerList: "",
                    correctName: false,
                    correctPlayerList: false,
                    correctGame: false,
                    who: "command",
                    key: "",
                    count: 0,
                    array: [],
                })
            }
        }
    };


    componentDidMount() {
        if (this.props.what === "edit") {
            let array = [];
            for (let i = 0; i < this.props.playerList.length; i++) {
                array.push(this.props.playerList[i].player)
            }
            this.setState({key: this.props.name}, () => {
                this.setState({
                    name: this.props.name,
                    game: this.props.game,
                    playerList: array.join(),
                });
            });
        }
        this.update();
    }

    /**
     * Метод редактирования данных, где ввиде props.getData() принимается метод для обновления состояния
     */
    edit = () => {
        localStorage.removeItem(this.state.key);
        this.addItem();
        this.props.getData();
    }

    update = () => {
        if (this.state.name !== "1") {
            this.setState({yes_no: true});
        } else
            this.setState({yes_no: false});
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
                                    label="Название Команды"
                                    variant="outlined"
                                    name="name" value={this.state.name} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockGame">
                    <FormControl required variant="outlined">
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
                <div className="blockName">
                    <Typography color="textPrimary" variant="body3">
                        Введите, пожайлуста, никнеймы участников вашей команды через пробел.
                    </Typography>
                    <div className="blockName">
                        <Typography color="textPrimary" variant="body3">
                            Например - iPowerll WolfHeart
                        </Typography>
                    </div>
                    <TextField
                        error={this.state.correctPlayerList}
                        id="outlined-required"
                        label="Участники команды"
                        variant="outlined"
                        name="playerList" value={this.state.playerList} onChange={this.handleChange}
                    />
                </div>
                <div className="blockButton">
                    {this.chooseButton()}
                </div>
            </div>
        )
    }
}

export default AddingCommand;