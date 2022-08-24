import React from "react";
import {Box, Button, Grid, Typography} from "@material-ui/core";
import TeamForm from "./teamForm";
import TeamList from "./teamList";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Media from "react-media";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {

        height: "100%",
        textAlign: 'center',

     },
    name: {
      '@media (min-width:813px)': {
        marginTop: "0.5em",
        marginBottom: "0.5em",
        fontSize: '2rem',
      },
      fontSize: '1.1rem',
      marginTop: "0.2em",
      marginBottom: "0.2em",
    },
  })
);



function Team(props) {
  const classes = useStyles();

  function isCapitan() {
    let result = false;
    if (window.localStorage.getItem("gamerId")) {
      const gamerId = JSON.parse(window.localStorage.getItem("gamerId"));
      props.team.forEach(g => {
        if (g.id === gamerId && g.capitan === true) {
          result = true;
        } else {
          return false
        }
      })
    }
    return result;
  }

  function isShowButtonLeaveGame() {
    let result = false;
    if (JSON.parse(window.localStorage.getItem("gamerId"))) {
      const gamerId = JSON.parse(window.localStorage.getItem("gamerId"));
      if (props.teamId === "1") {
        props.game.team1.forEach(g => {
          if (g.id === gamerId) {
            result = true;
          } else {
            result = false;
          }
        })
      } else if ((props.teamId === "2")) {
        props.game.team2.forEach(g => {
          if (g.id === gamerId) {
            result = true;
          } else {
            result = false;
          }
        })
      }
    } else {
      result = false;
    }

    return result;
  }

  function isShowButtonNewGame() {
    let result = false;
    if (window.localStorage.getItem("gamerId")) {
      if ((props.teamId === props.game.teamTurn) && isCapitan()) {
        result = true;
      }
    }
    return result;
  }


  function handleRemove() {
    if (window.localStorage.getItem("gamerId")) {
      props.handleRemoveFromGame(props.gamer);
      props.setGamer(null);
      window.localStorage.removeItem("gamer");
      window.localStorage.removeItem("gamerId");
    }
  }

  if (!JSON.parse(window.localStorage.getItem("gamerId"))) {
    return (
      <Grid className={classes.root} container
            direction="column"
            justify="space-between"
            alignItems="stretch"
            spacing={3}>
        <Grid>

            <Typography className={classes.name} noWrap>Team{props.teamId}</Typography>

          <TeamForm handleInput={props.handleInput} teamId={props.teamId}/>
          <TeamList team={props.team} noWrap/>
        </Grid>
        <Grid>
          {props.teamId === "1" ? <Typography variant="h1" noWrap>{props.game.team1Points}</Typography> :
            <Typography variant="h1" noWrap>{props.game.team2Points}</Typography>}
        </Grid>
      </Grid>);
  } else {
    return (
      <Grid className={classes.root} container
            direction="column"
            justify="space-between"
            alignItems="stretch">
        <Grid>

          <Typography className={classes.name} noWrap>Team {props.teamId}</Typography>
          <Box noWrap>
            {isShowButtonNewGame() ?
              <Button variant="contained" color="primary" onClick={props.turn}>END TURN</Button> : <></>}
          </Box>

          <TeamList team={props.team} noWrap/>

          <Box>
            <div> {isShowButtonLeaveGame() ?
              <Button variant="contained" color="primary" onClick={handleRemove}>Leave team</Button> : <></>}</div>
          </Box>
        </Grid>
        <Grid>
          <Media queries={{ small: "(max-width: 813px)" }}>
            {matches =>
              matches.small ? (
                <div>{props.teamId == "1" ? <Typography variant="h4" noWrap>{props.game.team1Points}</Typography> :
                  <Typography variant="h4" noWrap>{props.game.team2Points}</Typography>}</div>
              ) : (
                <div>{props.teamId == "1" ? <Typography variant="h1" noWrap>{props.game.team1Points}</Typography> :
                  <Typography variant="h1" noWrap>{props.game.team2Points}</Typography>}</div>
              )
            }
          </Media>
        </Grid>
      </Grid>
    );
  }
}


export default Team;