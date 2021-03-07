import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

// components jsx
import ChooseGameImg from "./CreatingDataStorageForm/ChooseGameImg";
import ChooseGameName from "./CreatingDataStorageForm/ChooseGameName";
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import CommandList from "./CreatingDataStorageForm/CommandList";

// css table
import "./CreatingDataStorageForm/CssTable/PageCommandList.css"


class MainPage extends Component {
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

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    /**
     * обновление данных в состоянии
     */
    pushObject = () => {
        let list = PassageLocal("command");
        const listItem = [];
        let i = 0;
        while (i < list.length) {
            const object = {
                id: i,
                name: list[i].name,
                game: ChooseGameName(list[i].game),
                img: ChooseGameImg(list[i].game),
                playerList: list[i].playerList,
                who:list[i].who,
            };
            listItem.push(object);
            i++;
        }
        this.setState({array: listItem});
    }


    render() {
        let listArray = [];
        if (this.state.sortPlayer === "name") {
            listArray = this.state.array.sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
                    if (item.id === 0)
                        return (<div key={item.id} className="block"><CommandList getData={this.pushObject} item={item}/></div>);
                    else
                        return (<div key={item.id}><CommandList getData={this.pushObject} item={item}/></div>);
                }
            )
        }else if(this.state.sortPlayer==="game")
            listArray = this.state.array.sort((a, b) => a.game.localeCompare(b.game)).map((item) => {
                    if (item.id === 0)
                        return (<div key={item.id} className="block"><CommandList getData={this.pushObject} item={item}/></div>);
                    else
                        return (<div key={item.id}><CommandList getData={this.pushObject} item={item}/></div>);
                }
            )
        return (
            <div className="block1">
                <div className="blockButton">
                    <Link to="/adding_command">
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
                                <option value={"name"}>По Названию</option>
                                <option value={"game"}>По Игре</option>
                            </Select>
                        </FormControl>
                    </div>
                {listArray}
            </div>
        );
    }
}

export default MainPage;