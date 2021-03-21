import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import chooseGameName from "./ChooseGameName";
import Avatar from "@material-ui/core/Avatar";
import {Link} from 'react-router-dom';
import chooseGame from "./ChooseGameImg";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import FaceIcon from '@material-ui/icons/Face'
import Tooltip from "@material-ui/core/Tooltip";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        paddingTop: 50,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    typographyFullName: {
        paddingTop: 20,
    },
    div: {
        display: "inline",
        paddingLeft: 5,
    }
}));

export default function ProfilesPlayer(props) {
    const classes = useStyles();
    let fullName = "";
    let arrayPlayers = [];
    let nameTeam;

    if (props.who === "player") {
        if (props.fullName !== "")
            fullName =
                <div className={classes.typographyFullName}>
                    <Typography color="textSecondary" variant="body3">
                        ФИО: {props.fullName}
                    </Typography>
                </div>
        if (props.team === "")
            nameTeam = <div className={classes.section2}>
                <Typography gutterBottom variant="body1">
                    Не состоит в команде
                </Typography>
            </div>
        else {
            arrayPlayers =
                <Link to={"/" + props.team}>
                        <Chip
                            icon={<PeopleAltOutlinedIcon />}
                            label={props.team}
                            color="primary"
                            variant="outlined"
                        />
                </Link>
            nameTeam =
                <div className={classes.section2}>
                    <Typography gutterBottom variant="body1">
                        Участник команды: {arrayPlayers}
                    </Typography>
                </div>
        }
    } else {
        if (props.playerList.length === 0) {
            nameTeam = <div className={classes.section2}>
                <Typography gutterBottom variant="body1">
                    Нет участников
                </Typography>
            </div>;
        } else {
            arrayPlayers = props.playerList.map((items, index) =>
                <div key={index} className={classes.div}>
                    <Link to={"/"+ items}>
                    <Chip
                        icon={<FaceIcon/>}
                        label={items}
                        color="primary"
                        variant="outlined"
                    />
                    </Link>
                </div>
            );
            nameTeam = <div className={classes.section2}>
                <Typography gutterBottom variant="body1">
                    Участники команды: {arrayPlayers}
                </Typography>
            </div>;
        }
    }
    return (
        <div className={classes.root}>
            <div className={classes.section1}>
                <Grid container xs={12} alignItems="center">
                    <Grid item container justify="left" xs={4}>
                        <Avatar variant='rounded' className={classes.large} src={chooseGame(props.game)}/>
                    </Grid>
                    <Grid item/>
                    <Grid item container justify="center" xs={4}>
                        <Typography gutterBottom variant="h4">
                            {props.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item container justify="right" xs={2}>
                        <Link to={"/edit/" + props.name}>
                            <Tooltip title="Изменить">
                            <IconButton aria-label="edit">
                                <CreateIcon/>
                            </IconButton>
                            </Tooltip>
                        </Link>
                    </Grid>
                    <Grid item/>
                </Grid>
                {fullName}
                <Typography color="textSecondary" variant="body2">
                    {chooseGameName(props.game)}
                </Typography>
            </div>
            <Divider variant="middle"/>
            {nameTeam}
            <Link to={props.link}>
                <Button variant="contained" color="default" size="large">
                    Вернуться назад
                </Button>
            </Link>
        </div>
    );
}