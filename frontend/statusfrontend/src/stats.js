import React from 'react'
import { Typography,  Button, Grid, CircularProgress, Snackbar} from '@mui/material'
import {Alert as MuiAlert} from '@mui/material';
import StatCard from "./components/cpu-card.js"
import Disk from "./components/disk-card.js"
import MinecraftServer from "./components/mc-card.js"
import "./Styles.css"
import ServerInfo from "./components/server-card.js"
import TerrariaServer from './components/terraria-card.js';
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
            serverInfo: null,
            terraria: []
        }
        this.getStats = this.getStats.bind(this);
        this.getInitialStats = this.getInitialStats.bind(this);
    }
    getInitialStats(){
        console.log(apiURL)
        fetch(apiURL+"setup").then(res => res.json()).then(json => {
            this.setState({
                version: json.version.toString(),
                serverInfo:json.ComputerInfo,
                isLoaded:false
            })
        }).catch(err => {
            this.setState({loaded: false, error: err})
        })
    }
    getStats(interupt){
        if(interupt){
            this.setState({isLoaded: false})
        }
        if(window.location.pathname === "/"){
            fetch(apiURL+"stats").then(res => res.json()).then(json => {
                this.setState ({
                    error: null,
                    isLoaded: true,
                    cpu: {cpuPer: json.cpu, cpuInfo:json.cpuInfo},
                    disk: {used: json.usedDisk, total: json.totalDisk},
                    ram: {used: json.usedRam, total: json.totalRam},
                    mc: json.minecraftInfo,
                    terraria: json.terrariaInfo
                })
                console.log(this.state);
            }).catch((err) => {
                this.setState({
                    isLoaded: false,
                    error: getNiceErrorMsg(err.toString())
                })
                console.error("STATS ERROR: " + this.state.error)
            })

            if(this.state.serverInfo == null){
                this.getInitialStats()
            }
        }
        
    }
    componentDidMount() {
        this.getInitialStats();
        this.getStats(true)
        setTimeout(()=> {
            setInterval(() => {
                this.getStats(false);
            }, 10000)
        }, 10000)
        
     }
    render() {
        if(this.state.isLoaded !== true){
            let errMsg = this.state.error
            
            console.log(typeof this.state.error)
            if(typeof errMsg == "object"){
                errMsg = ""
            }
            return (
                <>
                <CircularProgress/>
                <Alert severity="error">{errMsg}</Alert>
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
                    return (<MinecraftServer key={serverStats.id} stats={serverStats} loading={this.state.isLoaded}/>)
                })}
               {this.state.terraria.map((server) => {
                   return (<TerrariaServer stats={server} key={server.id}/>)
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