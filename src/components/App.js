import React from 'react';
import ExplicitOutlinedIcon from "@material-ui/icons/ExplicitOutlined";
import Dashboard from './Dashboard'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #009fff, #ec2f4b);',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  font: {
    fontFamily: 'Permanent Marker ,cursive',
    color:'#57606f'
  }
}));

const client_id = "a5914f22cf6248f1831513dd5e0f184c";
const redirect_url = "dfessence.herokuapp.com/";
var accessToken;

function presentAuthentication(){
  window.location.replace("https://api.instagram.com/oauth/authorize/?client_id="+client_id+"&redirect_uri="+redirect_url+"&response_type=token");
}


function App(props){
  const classes = useStyles();
  accessToken = document.location.hash;
  if(accessToken !== ""){
    accessToken = accessToken.split('&')
    .filter(function(el) { if(el.match('access_token') !== null) return true; })[0].split('=')[1];
    console.log(accessToken)
    return(
        <Dashboard access_token={accessToken}></Dashboard>
    )
  }else{
    console.log("USER must authenticate account first to  gain access to Essence.")
    return (
    <div className="App">
      <header className="App-header">
        <p className={classes.font}>
         <ExplicitOutlinedIcon />
          <br/>
          In order to use Essence, you must first authenticate your account on IG.
        </p>
      <Button variant="contained"   onClick={presentAuthentication} className={classes.root}>
        Authenticate Account
      </Button>
      </header>
    </div>
  );

  }
  
}

export default App;
