import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import chooseGameName from "./ChooseGameName";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center"
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
}));

export default function ProfilesPlayer(props) {
    const classes = useStyles();
    let bottomTypography = "";
    let fullName = "";
    let arrayPlayers = [];
    if (props.who === "player") {
        bottomTypography = "Состоит в команде:";
        arrayPlayers = props.team;
        fullName = props.fullName;
    } else {
        bottomTypography = "Участники команды:";
        arrayPlayers = props.playerList.map((items) =>
            <div key={items.id}>
                <Chip className={classes.chip} label={items.player}/>
            </div>
        );
    }
    return (
        <div className={classes.root}>
            <div className={classes.section1}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h4">
                            {props.name}
                        </Typography>
                    </Grid>
                    <Grid item/>
                </Grid>
                <Typography color="textSecondary" variant="body3">
                    {fullName}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {chooseGameName(props.game)}
                </Typography>
            </div>
            <Divider variant="middle"/>
            <div className={classes.section2}>
                <Typography gutterBottom variant="body1">
                    {bottomTypography}
                </Typography>
                {arrayPlayers}
            </div>
            <Link to={props.link}>
                <Button variant="contained" color="default" size="large">
                    Вернуться назад
                </Button>
            </Link>
        </div>
    );
}