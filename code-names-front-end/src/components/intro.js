import React from "react";


import { makeStyles, Typography, Button, Container, Paper, Grid} from "@material-ui/core";


const useStyles = makeStyles(() => ({
  cont: {
    marginTop: 80,
    padding: 30,
    border: "1px",
    borderColor: "black",
    borderRadius: "5px",
  },
  description: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",

  },
  typography: {
    textAlign: "left",
    margin: 8,
    paddingLeft: "17%",
  },

  form: {
    width: "100%",
    padding: 10,
  },
  buttonCreateOne: {
    marginTop: 20,
  },
  buttonLogIn: {
    width: "100%",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
  }

}));

function Intro(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.cont}>
        <Grid container
              direction="column"
              justify="space-evenly"
              alignItems="center">

          <Grid container
                direction="column"
                justify="space-evenly"
                alignItems="left"
                className={classes.typography}>
            <Typography variant="h4" gutterBottom>
              How to play:
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom> 1. Click on the CREATE ROOM button.</Typography>
            <Typography variant="h5" component="h5" gutterBottom> 2. Select the preferred game settings and start the
              game.</Typography>
            <Typography variant="h5" component="h5" gutterBottom> 3. Connect with your friends using your favorite audio
              or video chat.</Typography>
            <Typography variant="h5" component="h5" gutterBottom> 4. Share the room URL with your friends.</Typography>
            <Typography variant="h5" component="h5" gutterBottom> 5. Enjoy the game!</Typography>
          </Grid>
          <Typography variant="h4">
            DO YOU WANT CREATE NEW ROOM?
          </Typography>
          <Button
            onClick={() => props.setNewGame(true)}
            className={classes.buttonCreateOne}
            variant="contained"
            color="primary"
          >
            Create one
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Intro;