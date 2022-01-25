import React, {useEffect, useState} from "react"
import { Grid, Card, CardContent, Typography, IconButton, Dialog} from "@mui/material"
import "../Styles.css"
import InfoIcon from '@mui/icons-material/Info';



function TerrariaVanilla(props){
    let [color, changeColor] = useState("gray-card");
    let [infoState, changeInfoState] = useState(false)
    useEffect(()=> {
        if(props.stats.online){
            changeColor("green-card")
        } else {
            changeColor("red-card");
        }
     }, [color])
     

    let ipbox = (null)
    if(props.stats.ip){
        ipbox = (<><Typography variant="p" style={{fontSize: "3.5vh", fontFamily: "roboto"}}>{props.stats.ip}</Typography><br/></>)
    }
    let maintain;
    if(props.stats.maintenance){
        maintain = (<><Typography variant="p" style={{fontFamily: "roboto"}}>{props.stats.maintenance}</Typography><br/></>)
    } else {
        maintain = (null)
    }

    function openInfo(){
        changeInfoState(true)
        setTimeout(()=> {
            changeInfoState(false);
        }, 5000)
    }
    function closeInfo(){
        changeInfoState(false)
        
    }

    let infoAlert = null
    if(infoState){
        infoAlert = (<Dialog style={{backgroundColor: "#363636"}} open={infoState} onClose={closeInfo}><Typography variant="p" style={{fontFamily: "roboto"}}>Due to the limitations of vanilla Terraria servers, available information about this server is very limited.<br/>Consider changing to a compatible modded Terraria server.</Typography></Dialog>)
    } else {
        infoAlert = (null)
    }
    
    
    try {
        console.log(props.stats)
        let val = props.stats
    } catch(err){
        return (null)
    } finally {
    
    return (
        <>
        <Grid item key={props.key}>
                <Card variant="outlined" >
                <CardContent className={color}>
                    <center>
                    <Typography variant="h5">
                        {props.stats.name}
                    </Typography> <br/>
                    {ipbox}
                    {maintain} 
                    <IconButton onClick={openInfo}>
                        <InfoIcon/>
                    </IconButton>
                    </center>
                </CardContent>
                </Card>
                
            </Grid>
            {infoAlert}
            </>
    )
    }
}


function ModdedTerraria(props){
    let [color, changeColor] = useState("gray-card");
    useEffect(()=> {
        if(props.stats.status === "200" || props.stats.online){
            changeColor("green-card")
        } else {
            changeColor("red-card");
        }
     }, [color])

    let ipbox = (null)
    if(props.stats.ip){
        ipbox = (<><Typography variant="p" style={{fontSize: "3.5vh", fontFamily: "roboto"}}>{props.stats.ip}</Typography><br/></>)
    }
    let maintain;
    if(props.stats.maintenance){
        maintain = (<><Typography variant="p" style={{fontFamily: "roboto"}}>{props.stats.maintenance}</Typography><br/></>)
    } else {
        maintain = null
    }
    return (
        <Grid item >
                <Card variant="outlined"  >
                <CardContent className={color}>
                    <center>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>{props.stats.serverversion}</Typography>
                    <Typography variant="h5">
                        {props.stats.name}
                    </Typography> <br/>
                    {ipbox}
                    <Typography variant="p" style={{fontFamily: "roboto"}}>
                        Players: {props.stats.playercount}/{props.stats.maxplayers}
                    </Typography><br/>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>
                        World: {props.stats.world}
                    </Typography><br/>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>
                        Uptime: {props.stats.uptime}
                    </Typography>
                    {maintain} 
                    </center>
                </CardContent>
                </Card>
            </Grid>
    )
}


class TerrariaServer extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    render(){
        if(this.props.stats.type === "vanilla"){
            return (
                <TerrariaVanilla stats={this.props.stats}/>
            )
        } else {
            return (
                <ModdedTerraria stats={this.props.stats}/>
            )
        }
    }
}

export default TerrariaServer