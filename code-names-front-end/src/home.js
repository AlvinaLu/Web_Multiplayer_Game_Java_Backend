import logo from './logo.svg';
import './App.css';
import {Grid} from "@material-ui/core";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Pole from "./components/pole";
import Team from "./components/teams/team";
import Game from "./components/game";
import Intro from "./components/intro";
import React, {useState} from "react";
import Link from "./components/link";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Switch from "@material-ui/core/Switch";
import MyLink from "./components/link";


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: 8,
    },
    name: {
      textAlign: 'center',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  }),
);

function Home() {
  const classes = useStyles();
  const [newGame, setNewGame] = useState(false);
  const [goToGame, setGoTOGame] = useState(false);
  const [getLink, setGetLink] = useState(false);
  console.log(newGame);
  console.log("1 Go to new game " + goToGame);



    return (
      <div className={classes.root}>
        <Box>{newGame == false ? <Intro newGame={newGame} setNewGame={setNewGame}/> :
          <MyLink goToGame={goToGame} setGoToGame={setGoTOGame}/>}</Box>
      </div>

    );

}

export default Home;
