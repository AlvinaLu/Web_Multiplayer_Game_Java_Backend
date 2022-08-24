import './App.css';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Navigation from "./navigation";

const useStyles = makeStyles((theme) =>
  createStyles({
    name: {
      '@media (min-width:813px)': {
        textAlign: 'center',
        display: "block",
      },
      display: "none",

    },
  }),
);

function App() {
  const classes = useStyles();
    return (
      <>
        <Box className={classes.name}>
          <Typography variant="h2">CODE NAMES</Typography>
        </Box>
      <Navigation/>
      </>
    );
  // }
}

export default App;
