import React from "react"
import { Grid, Card, CardContent, CircularProgress, Typography, Button} from "@mui/material"
import "../Styles.css"
import MinecraftWebsocketView from "./mc-websocket"


function CircleLoader(props){
    if(props.hide){
        return null
    } else {
        return (<CircularProgress />)
    }
}


class MinecraftServer extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state ={
            color: "gray-card",
            websocketOpen: false
        }
    }
    
    changeWebsocketView(){
        if(this.state.websocketOpen){
            this.setState({websocketOpen:false})
        } else {
            this.setState({websocketOpen: true})
        }
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentDidUpdate(prevProps, prevState){
       if(this.props.stats.online === true){
           if(prevState.color === "green-card") return;
           this.setState({
               color: "green-card"
           })
       } else {
        if(prevState.color === "red-card") return;
           this.setState({
               color: "red-card"
           })

       }
    }

    render(){
        let privateMsg = null;
        if(this.props.stats.isPrivate){
            privateMsg = "Private Server"
        } else {
            privateMsg = "Public Server";
        }
        let ipbox = (null)
        let websocket = (null)
        if(this.props.stats.ip){
            ipbox = (<><Typography variant="p" style={{fontSize: "3.5vh", fontFamily: "roboto"}}>{this.props.stats.ip}</Typography><br/></>)
        }
        let maintain;
        if(this.props.stats.maintenance){
            maintain = (<><Typography variant="p" style={{fontFamily: "roboto"}}>{this.props.stats.maintenance}</Typography><br/></>)
        } else {
            maintain = null
        }
        if(this.props.stats.websocket === true){
            websocket = (<><Button onClick={this.changeWebsocketView.bind(this)} style={{color: "black"}}>Open LiveView</Button><MinecraftWebsocketView open={this.state.websocketOpen} handleClose={this.changeWebsocketView.bind(this)} stats={this.props.stats}></MinecraftWebsocketView></>)
        } 
        return (
            <Grid item >
                <Card variant="outlined"  >
                <CardContent className={this.state.color}>
                    <center>
                    <CircleLoader hide={this.props.loading} />
                    <Typography variant="p" style={{fontFamily: "roboto"}}>{this.props.stats.version}</Typography>
                    <Typography variant="h5">
                        {this.props.stats.name}
                    </Typography> <br/>
                    <Typography variant="p">
                        <i style={{fontFamily: "roboto"}}>{privateMsg}</i>
                    </Typography> <br/>
                    {ipbox}
                    <Typography variant="p" style={{fontFamily: "roboto"}}>
                        Players: {this.props.stats.onlinePlayers}/{this.props.stats.maxPlayers}
                    </Typography><br/>
                    {maintain} 
                    {websocket}
                    </center>
                </CardContent>
                </Card>
                
            </Grid>
        )
    }
}

export default MinecraftServer