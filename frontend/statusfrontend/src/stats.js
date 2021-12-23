import React from 'react'
import { Typography,  Button, Grid, CircularProgress, Snackbar} from '@mui/material'
import {Alert as MuiAlert} from '@mui/material';
import StatCard from "./components/cpu-card.js"
import Disk from "./components/disk-card.js"
import MinecraftServer from "./components/mc-card.js"
import "./Styles.css"
import ServerInfo from "./components/server-card.js"
import { getNiceErrorMsg } from './data/niceErrorNames.js';
const apiURL = "https://ServerStatus.brysonvan1.repl.co/"

function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class Stats extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            cpu: {cpuPer: "Not Loaded"},
            disk: {used: null, total: null},
            version: "Not Loaded",
            ram: {used: null, total: null},
            mc:[],
            serverInfo: null
        }
    }
    getInitialStats(){
        console.log(apiURL)
        fetch(apiURL+"setup").then(res => res.json()).then(json => {
            this.setState({
                version: json.version.toString(),
                serverInfo:json.ComputerInfo
            })
        })
    }
    getStats(interupt){
        if(interupt){
            this.setState({isLoaded: false, items: "Loading..."})
        }
        if(window.location.pathname === "/"){
            fetch(apiURL+"stats").then(res => res.json()).then(json => {
                this.setState ({
                    error: null,
                    isLoaded: true,
                    cpu: {cpuPer: json.cpu, cpuInfo:json.cpuInfo},
                    disk: {used: json.usedDisk, total: json.totalDisk},
                    ram: {used: json.usedRam, total: json.totalRam},
                    mc: json.minecraftInfo
                })
                console.log(this.state);
            }).catch((err) => {
                this.setState({
                    isLoaded: false,
                    error: getNiceErrorMsg(err.toString())
                })
                console.error("STATS ERROR: " + this.state.error)
            })
        }
        
    }
    componentDidMount() {
        this.getInitialStats();
        this.getStats(true)
        setTimeout(()=> {
            setInterval(() => {
                this.getStats(false);
            }, 4000)
        }, 5000)
        
     }
    render() {
        if(this.state.isLoaded === false){
            return (
                <>
                <CircularProgress/>
                <Snackbar open={this.state.error !== null} autoHideDuration={300}>
                    <Alert severity="error">{this.state.error}</Alert>
                </Snackbar>
                </>
            )
        } else {
        return (
            <>
            <Grid container spacing={3}>
                <ServerInfo stats={this.state.serverInfo}/>
                <StatCard stat="CPU Usage" val={this.state.cpu.cpuPer} loading={this.state.isLoaded} extraInfo={this.state.cpu.cpuInfo}/>
                <Disk stat="Disk Usage" val={{used: this.state.disk.used, total: this.state.disk.total}} loading={this.state.isLoaded} />
                <Disk stat="RAM Usage" val={{used: this.state.ram.used, total: this.state.ram.total}} loading={this.state.isLoaded} />
                {this.state.mc.map((serverStats) => {
                    return (<MinecraftServer stats={serverStats} loading={this.state.isLoaded}/>)
                })}
               
            </Grid>
            <Button onClick={this.getStats.bind(this)}>
                Resync Stats
            </Button>
            <Typography className="version">{"Version: " + this.state.version}</Typography>
            <Snackbar open={this.state.error !== null} autoHideDuration={300}>
                <Alert severity="error">{this.state.error}</Alert>
            </Snackbar>
            
            </>
        )
    }
}
}

export {Alert}
export default Stats