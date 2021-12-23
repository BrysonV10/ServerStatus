import React, {useState, useEffect} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Typography, Button, Grid, Modal } from "@mui/material"
import socketIOClient from "socket.io-client";
import "./Styles.css"
import Terminal from "terminal-in-react"
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } 

const WebTerm = (props) => {
    
    function runCommand(args, print){
        if(args.length >1){
            print("Awaiting Response...")
        } else {
            print("You need to include a command to run")
        }
    }

    function authCommand(args, print){
        if(args.length === 1){
            print("You need to include the passphrase to authenticate with the server.")
            return;
        } else if(args.length >2){
            print("There is only one parameter for this command.")
            return;
        } else {
            //valid passphrase - auth with server
            print("Authenticating with server...")
        }
        
    }

    if(props.show){
        return (
            <Terminal
            color="#47e82e"
            backgroundColor="black"
            barcolor="gray"
            closedTitle="Window Closed"
            closedMessage="Click outside of this window to close the terminal."
            commands={{
                "run": runCommand,
                "auth": authCommand
            }}
            msg="Use the run command followed by the command you want to run to execute a command on the server. Use the auth command followed by the passphrase to authenticate with the server."
            />
        )
    } else {
        return (null)
    }
}

const Admin = () => {
    const { isAuthenticated, user } = useAuth0()
    var [flow, changeFlow] = useState("default")
    if(isAuthenticated){
        return (
            <div>
                <Typography>Welcome {user.nickname}!</Typography>
                <Modal open={flow=== "webssh"} onClose={() => changeFlow("default")} style={{width: "50vw", backgroundColor: "rgba(48, 48, 48, 0.7)"}}>
                    <WebTerm show={true}/>
                </Modal>
                <Typography>From here you can manage many aspects of the server.</Typography>
                <Button onClick={() => changeFlow("webssh")}>Access WebSSH</Button>
            </div>
        )
    }
    
}

export default Admin
