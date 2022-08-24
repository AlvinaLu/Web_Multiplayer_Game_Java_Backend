import './App.css';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Game from "./components/game";
import React from "react";
import {Switch, Route} from "react-router-dom"
import Home from "./home";


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

function Navigation() {
   return (
      <Switch>
        <Route exact path="/" component={Home}>
        </Route>
        <Route exact path="/game/:id" component={Game}>
        </Route>
      </Switch>

  );
}

export default Navigation;
