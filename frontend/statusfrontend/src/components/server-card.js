import React from "react"
import {Typography, Grid, Card, CardContent} from "@mui/material"
import "../Styles.css"

class ServerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        
        return (
        <Grid item >
                <Card variant="outlined"  >
                <CardContent className={this.state.color}>
                <center>
                    <Typography variant="h5">
                        Server Information
                    </Typography>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>Server Nickname: {this.props.stats.ComputerName}</Typography>
                    <br/>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>Running on user <i>{this.props.stats.UserName}</i></Typography>
                    <br/>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>{this.props.stats.OSInfo}</Typography>
                    <br/>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>ServerStatus started at {this.props.stats.bootTime}</Typography>
                </center>
                </CardContent>
                </Card>
            </Grid>
        )
    }
}


export default ServerInfo