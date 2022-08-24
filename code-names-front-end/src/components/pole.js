import React from "react";
import {Grid} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import MyFlips from "./cards/flips";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoFlips from "./cards/noFlips";
import Flipped from "./cards/flipped";
import NoFlipsCapitan from "./cards/noFlipsCapitan";



const useStyles = makeStyles((theme) =>
  createStyles({
    card: {

    },
    loading: {
      display: 'flex',
      '& > * + *': {
        marginLeft: "1vw",
      }},
  }),
);

function Pole(props) {
  const classes = useStyles();

  function renderSwitch(card, isOpen, justOpen){
    const gamer = JSON.parse(window.localStorage.getItem("gamer"));
    if(gamer!=null && gamer.capitan){
      if (isOpen) {
        if (justOpen) {
          return <NoFlipsCapitan card={card}/>
        } else {
          return <Flipped card={card}/>
        }
      } else {
        return <Flipped card={card}/>
      }
    }else {
      if (isOpen) {
        if (justOpen) {
          return <NoFlips card={card}/>
        } else {
          return <Flipped card={card}/>
        }
      } else {
        return <MyFlips card={card} hadleClickCard={props.handleClickCard}/>
      }
    }
  }

 if(props.game===null){
   return (<div className={classes.loading} style={{position: "absolute", top: "50%", left: "50%"}}>
     <CircularProgress />
   </div>);
 }else {
  return (<>
      <Grid  container
             justify="space-between"
             alignItems="stretch">
        {props.game.pole.map((cards) => (
          <Grid container className={classes.card} container
                justify="space-between"
                alignItems="stretch">
            {cards.map((card) => (
              <Grid container item  xs zeroMinWidth>
                {renderSwitch(card, card.open, card.justOpen)}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
 }
}

export default Pole;