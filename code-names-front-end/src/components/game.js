import React, {useEffect, useState} from "react";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Team from "./teams/team";
import Pole from "./pole";
import Stomp from 'stompjs';
import SockJS from "sockjs-client";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Media from "react-media";
import {withGetScreen} from 'react-getscreen';
import './pole.css';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';


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
      gridGap: theme.spacing(1),
    },
    paperLeft: {
      '@media (min-width:813px)': {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
      },
      height: "100%",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },
    paperRight: {
      '@media (min-width:813px)': {
        height: "100%",
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      height: "100%",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },
    paperPole: {
      '@media (min-width:813px)': {
        paddingRight: theme.spacing(1),
        textAlign: 'center',
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
      },
      paddingRight: theme.spacing(0),
      textAlign: 'center',
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(0),
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
    loading: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#ffffff',
      textAlign: 'center',
    },
    phone: {

    }
  }),
);

const requestOptions = {
  method: "GET",
  headers: {"Content-Type": "application/json"},
};


function Game(props) {
  const classes = useStyles();
  const [game, setGame] = useState(null);
  const [gamer, setGamer] = useState(null);
  const [open, setOpen] = React.useState(true);
  const [win, setWin] = React.useState(false);
  const [warning, setWarning] = useState("");
  if( window.localStorage.getItem("game")){
    if(window.localStorage.getItem("game") !==  props.match.params.id){
      window.localStorage.removeItem("gamer");
      window.localStorage.removeItem("gamerId");
      window.localStorage.removeItem("game")
    }
  }else{
    window.localStorage.setItem("game", props.match.params.id);
  }
  const handleClose = () => {
    setOpen(false);
  }
    /// Input gamer's name
  function handleInput(name, teamId) {
    fetch(`/createGamer?gameId=${game.gameId}&gamerName=${name}&teamId=${teamId}`, requestOptions)
      .then(res => res.json())
      .then((result) => {
          window.localStorage.setItem("gamer", JSON.stringify(result));
          window.localStorage.setItem("gamerId", JSON.stringify(result.id));
          setGamer(result);
        }
      )
  }
  ///Remove gamer from game
  function handleRemoveFromGame(gamer) {
    fetch(`/removeGamer?gameId=${game.gameId}&gamerId=${gamer.id}&teamId=${gamer.team}`, requestOptions)
      .then(res => res.json())
      .then((result) => {
        }
      )
  }
  /// Click card by gamer
  function handleClickCard(cardId, gamerFlipCard) {
    fetch(`/flipCard?gameId=${game.gameId}&gamerId=${gamerFlipCard.id}&teamId=${gamerFlipCard.team}&cardId=${cardId}`, requestOptions)
      .then(res => res.json())
      .then((result) => {
          if (result.gameId === "gamer is in the opposite team") {
            setWarning("You are in the opposite team")
          } else {
            setWarning("")
          }
        }
      )
  }
  /// Capitan passes turn to other team
  function handleTurn() {
    console.log("handleTurn")
    fetch(`/endTurn?gameId=${game.gameId}`, requestOptions)
      .then(res => res.json())
      .then((result) => {
        }
      )
  }

  /// Check is player is capitan
  function isCapitan() {
    let result = false;
    if (window.localStorage.getItem("gamerId")) {
      const gamerId = JSON.parse(window.localStorage.getItem("gamerId"));
      game.team1.forEach(g => {
        if (g.id === gamerId && g.capitan === true) {
          result = true;
        }
      })
      game.team2.forEach(g => {
        if (g.id === gamerId && g.capitan === true) {
          result = true;
        }
      })

    }
    return result;
  }
  //New game in the start
  function handleNewGame() {
    handleClose();
    fetch(`/newGame?gameId=${game.gameId}`, requestOptions)
      .then(res => res.json())
      .then((result) => {

        }
      )

  };
  //New game by capitan
  function handleNewGameFromCapitan() {
    fetch(`/newGame?gameId=${game.gameId}`, requestOptions)
      .then(res => res.json())
      .then((result) => {

        }
      )
  };
  //Websocket
  useEffect(() => {
    const socket = new SockJS("/game");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(
        "/topic/game" + props.match.params.id, output => {
          let result = JSON.parse(output.body);
          setGame(result);
          setWin(result.win);
          setOpen(true);
          return result;
        }
      );
      stompClient.send("/app/game", {},
        JSON.stringify({"from": "/topic/game" + props.match.params.id, "gameId": props.match.params.id}))
    });
    return () => stompClient && stompClient.disconnect();
  }, [])


  if (game === null) {
    return (<div className={classes.loading} style={{position: "absolute", top: "50%", left: "50%"}}>
      <CircularProgress/>
    </div>);
  }
  if (props.isMobile()){
    return (
    <><div class="phone" style={{position: "fixed", top: "50%", left: "50%",  marginTop: "-100px", marginLeft: "-100px"}}>
      <ScreenRotationIcon style={{ fontSize: 200}}></ScreenRotationIcon>
    </div><Container>   Please, turn your phone to landscape mode</Container></>);}
  else {
    return (<>
        <Grid container
              direction="row"
              justify="center"
              alignItems="stretch"
              spacing={1} style={{paddingTop: "1vw"}}>
          <Grid item xs={2}>
            <Paper className={classes.paperLeft} style={{backgroundColor: "#2c88b3"}}>
              <Team teamId={"1"} handleInput={handleInput} gamer={gamer} setGamer={setGamer} team={game.team1}
                    handleRemoveFromGame={handleRemoveFromGame} game={game} turn={handleTurn}/>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            {game.fail ?
              <>
                <Backdrop className={classes.backdrop} open={open}>
                  <Grid item>
                    <Typography variant="h2">GAME OVER!</Typography>
                    {isCapitan() ?
                      <Button variant="contained" color="secondary" onClick={handleNewGame}>New game</Button> :
                      <Button variant="contained" color="secondary" onClick={handleClose}>OK</Button>}
                  </Grid>
                </Backdrop>
              </>
              : <></>}
            {game.win ?
              <>
                <Backdrop className={classes.backdrop} open={open}>
                  <Grid item>
                    <Typography variant="h2">Team {game.teamTurn} win!</Typography>
                    {isCapitan() ?
                      <Button variant="contained" color="secondary" onClick={handleNewGame}>New game</Button> :
                      <Button variant="contained" color="secondary" onClick={handleClose}>OK</Button>}
                  </Grid>
                </Backdrop>
              </> : <></>}
            {(game.teamTurn === "1") ?
              <Paper className={classes.paper} style={{backgroundColor: "#2c88b3"}}>
                <Media query="(min-width:813px)" render={() =>
                  (
                    <Typography>Team {game.teamTurn} move</Typography>
                  )}
                />
                {isCapitan() ? <Button variant="contained" color="primary" onClick={handleNewGameFromCapitan}>New
                  Game</Button> : <></>}
              </Paper> :
              <Paper className={classes.paper} style={{backgroundColor: "#d01f5d"}}>
                <Media query="(min-width:813px)" render={() =>
                  (
                    <Typography>Team {game.teamTurn} move</Typography>
                  )}
                />
                {isCapitan() ? <Button variant="contained" color="primary" onClick={handleNewGameFromCapitan}>New
                  Game</Button> : <></>}
              </Paper>
            }
            <Paper className={classes.paperPole}>
              <Pole game={game} handleClickCard={handleClickCard}/>
              <Typography>{warning}</Typography>
            </Paper>


          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paperRight} style={{backgroundColor: "#d01f5d"}}>
              <Team teamId={"2"} handleInput={handleInput} gamer={gamer} setGamer={setGamer} team={game.team2}
                    handleRemoveFromGame={handleRemoveFromGame} game={game} turn={handleTurn}/>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }

}


export default withGetScreen(Game);