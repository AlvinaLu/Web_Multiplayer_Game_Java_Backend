import React, {useState, useEffect, useRef} from "react";
import {
  Box,
  makeStyles,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import * as constants from "./constants";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CircularProgress from "@material-ui/core/CircularProgress";

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
    },
    form: {
      width: "100%",
      padding: 10,
    },
    buttonCreateOne: {
      marginTop: 20,
    },
    buttonLink: {
      margin: 20,
    },
    errorText: {
      textAlign: "center",
      color: "red",
    },
    paper: {
      padding: 10,
    },
    margin: {
      margin: 30,
    }
  }),
);
const requestOptions = {
  method: "GET",
  headers: {"Content-Type": "application/json"},
};

function MyLink(props) {
  const classes = useStyles();
  const [gameId, setGameId] = useState(null);


  useEffect(() => {
    fetch("/createGame", requestOptions)
      .then(res => res.json())
      .then((result) => {
          setGameId(result.gameId);
          window.localStorage.setItem("game", result.gameId);
          console.log(" 2. Success response from the server, the game link is: " + result.gameId);
        }
      )
  }, [])

  if (gameId === null) {
    return (<div className={classes.loading} style={{position: "absolute", top: "50%", left: "50%"}}>
      <CircularProgress/>
    </div>);
  } else {
    return (
      <Container maxWidth="md">
        <Paper className={classes.cont}>
          <Grid container
                direction="column"
                justify="space-evenly"
                alignItems="center">
            <Typography variant="h4" className={classes.typography}>
              Share the room URL with your friends.
            </Typography>
            <Box className={classes.paper}>
              <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                <Grid item>
                  <Typography>
                    {window.location.origin + "/game/" + gameId}
                  </Typography>
                </Grid>
                <Grid item>
                  <CopyToClipboard text={window.location.origin + "/game/" + gameId}>
                    <Button
                      className={classes.buttonLink}
                      variant="outlined"
                      color="primary">copy link
                    </Button>
                  </CopyToClipboard>
                </Grid>
              </Grid>
            </Box>

            <Button
              component={Link}
              to={"/game/" + gameId}
              className={classes.buttonCreateOne} variant="contained"
              color="primary"
            >Let's play!
            </Button>
          </Grid>
        </Paper>
      </Container>

    );
  }
}

export default MyLink;