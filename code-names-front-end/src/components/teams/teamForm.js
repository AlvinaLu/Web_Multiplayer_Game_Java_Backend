import React, {useState} from "react";
import {createStyles, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: 8,
    },
    input: {
      textAlign: 'center',
    },
  }),
);

const requestOptions = {
  method: "GET",
  headers: {"Content-Type": "application/json"},
};



const TeamForm = (props) => {
  const [title, setTitle] = useState("");
  const classes = useStyles();

  const changeHandler = (event) =>{
    setTitle(event.target.value)
  }

  const keyPressEnter = (event) =>{
    if(event.key==="Enter" && title.length<12){
      props.handleInput(title, props.teamId)
      setTitle("")
    }
  }



  return (
    <div className={classes.root}>
      <div>{title.length>=12? <Typography style={{textColor: "red"}}>You put too long hame</Typography>: <></>}</div>
      <input className={classes.input}
        placeholder={"Put your name"}
        value={title}
        onChange={changeHandler}
        onKeyPress={keyPressEnter}/>
    </div>);


}

export default TeamForm;