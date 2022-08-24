import React from 'react';
import Flippy, {FrontSide, BackSide} from "react-flippy";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    loading: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      }
    },
    defaultColor: {
      margin: "1vh",
      alignItems: "center",
      justify: "center",
      borderRadius: '10px',
      backgroundColor: '#c1b38f',
      '@media (min-width:813px)': {
        minWidth: "11vw",
        minHeight: "10vh"
      },
      minWidth: "11vw",
      minHeight: "5vh"
    },
    blueColor: {
      margin: "1vh",
      alignItems: "center",
      justify: "center",
      borderRadius: '10px',
      backgroundColor: '#2c88b3',
      '@media (min-width:813px)': {
        minWidth: "11vw",
        minHeight: "10vh"
      },
      minWidth: "11vw",
      minHeight: "5vh"
    },
    redColor: {
      margin: "1vh",
      alignItems: "center",
      justify: "center",
      borderRadius: '10px',
      backgroundColor: '#d01f5d',
      '@media (min-width:813px)': {
        minWidth: "11vw",
        minHeight: "10vh"
      },
      minWidth: "11vw",
      minHeight: "5vh"
    },
    whiteColor: {
      margin: "1vh",
      alignItems: "center",
      justify: "center",
      borderRadius: '10px',
      backgroundColor: "#ccd2d5",
      '@media (min-width:813px)': {
        minWidth: "11vw",
        minHeight: "10vh"
      },
      minWidth: "11vw",
      minHeight: "5vh"
    },
    blackColor: {
      margin: "1vh",
      alignItems: "center",
      justify: "center",
      borderRadius: '10px',
      backgroundColor: "#3d3f40",
      '@media (min-width:813px)': {
        minWidth: "11vw",
        minHeight: "10vh"
      },
      minWidth: "11vw",
      minHeight: "5vh"
    },
  }),
);

const theme = createMuiTheme();

theme.typography.h5 = {
  '@media (min-width:813px)': {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    fontSize: '1.7rem',
  },
  fontSize: '0.9rem',
  marginTop: "0.2em",
  marginBottom: "0.2em",
};


function MyFlips(props) {
  const classes = useStyles();

  const handleClick = () => {
    if (window.localStorage.getItem("gamer") === null) {
    }
    if (window.localStorage.getItem("gamer") != null) {
      props.hadleClickCard(props.card.id, JSON.parse(window.localStorage.getItem("gamer")));
    }
  }

  if (props.card === null) {
    return (<div className={classes.loading} style={{position: "absolute", top: "50%", left: "50%"}}>
      <CircularProgress/>
    </div>);
  } else {
    return (
      <div onClick={handleClick}>
          <Flippy
            flipOnClick={false}
            flipDirection="horizontal"
          >
            <FrontSide className={classes.defaultColor}>
              <ThemeProvider theme={theme}>
              <Typography variant="h5">
                {props.card.title}
              </Typography>
              </ThemeProvider>
            </FrontSide>
            <BackSide className={classes[props.card.color]}>
              <ThemeProvider theme={theme}>
                <Typography variant="h5">
                  {props.card.title}
                </Typography>
              </ThemeProvider>
            </BackSide>
          </Flippy>
      </div>
    );
  }
}

export default MyFlips;
