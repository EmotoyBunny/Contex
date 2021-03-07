import React, {Component} from 'react';
import {Link} from "react-router-dom";

import List from "@material-ui/core/List";
import "./CreatingDataStorageForm/CssTable/PlayerList.css"
import ChooseGameImg from "./CreatingDataStorageForm/ChooseGameImg";
import ChooseGameName from "./CreatingDataStorageForm/ChooseGameName";
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import PlayerList from "./CreatingDataStorageForm/PlayerList";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";


class MainPagePlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            sortPlayer: "name",
        };
    }

    componentDidMount() {
        this.pushObject();
    }



    /**
     * обновление данных в состоянии
     */
    pushObject = () => {
        let list = PassageLocal("player");
        const listItem = [];
        let i = 0;
        while (i < list.length) {
            const object = {
                id: i,
                name: list[i].name,
                game: ChooseGameName(list[i].game),
                img: ChooseGameImg(list[i].game),
                fullName: list[i].fullName,
                team: list[i].team,
                who: list[i].who,
            };
            listItem.push(object);
            i++;
        }
        this.setState({array: listItem});
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };



    render() {
        let listArray = [];
        if (this.state.sortPlayer === "name") {
            listArray = this.state.array.sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
                    return (
                        <div key={item.id}>
                            <List className="root1">
                                <PlayerList getData={this.pushObject} item={item}/>
                            </List>
                        </div>);
                }
            )
        }else if(this.state.sortPlayer==="game")
            listArray = this.state.array.sort((a, b) => a.game.localeCompare(b.game)).map((item) => {
                    return (
                        <div key={item.id}>
                            <List className="root1">
                                <PlayerList getData={this.pushObject} item={item}/>
                            </List>
                        </div>);
                }
            )
        return (
            <div className="block1">
                <div className="blockButton">
                    <Link to="/adding_player">
                        <Button variant="contained" color="default" size="large">
                            Добавить
                        </Button>
                    </Link>
                </div>
                <div className="block1">
                    <FormControl variant="outlined">
                    <InputLabel>Сортировка</InputLabel>
                    <Select
                        native
                        value={this.state.sortPlayer}
                        onChange={this.handleChange}
                        label="Сортировка"
                        name='sortPlayer'
                    >
                        <option value={"name"}>По Никнейму</option>
                        <option value={"game"}>По Игре</option>
                    </Select>
                </FormControl>
                </div>
                {listArray}
            </div>
        );
    }
}

export default MainPagePlayers;
