import React from "react";
import { Divider, Typography} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const myStyle = {
  marginTop: "1em",
  marginBottom: "1em",
  color: "#030003"
};

const capitanStyle = {
  marginTop: "1em",
  marginBottom: "1em",
  color: "#faf9fc"
};


function TeamList(props) {

  function isYou(gamer) {
    let result = false;
    if (window.localStorage.getItem("gamerId")) {
      const gamerId = JSON.parse(window.localStorage.getItem("gamerId"));
      if (gamer === gamerId) {
        result = true;
      }
      return result;
    }
  }


  if (props.team.length === 0) {
    return (<>No gamers</>);
  } else {
    return (

      <ul>
        {props.team.map(person => {
          if (!person.capitan) {
            return (
              <li key={person.id}>
                <label>
                  <>{isYou(person.id) ? <Typography variant="h5" style={myStyle}>You: {person.name}</Typography> :  <Typography variant="h5" style={myStyle}>{person.name}</Typography>}</>
                  <Divider/>
                </label>
              </li>
            );
          } else {
            return (
              <li key={person.id}>

                <label>
                  <>{isYou(person.id) ? <> <Tooltip title="If you want pass master, you should start new game"  placement="bottom-start">
                      <Typography variant="h5" style={capitanStyle}>You are capitan, </Typography></Tooltip>
                      <Typography variant="h5" style={capitanStyle}>{person.name}</Typography></> :
                    <> <Typography variant="h5" style={capitanStyle}> Capitan: </Typography> <Typography variant="h5" style={capitanStyle}>{person.name}</Typography></>}</>
                  <Divider/>
                </label>
              </li>);
          }
        })}
      </ul>
    );
  }
}


export default TeamList;