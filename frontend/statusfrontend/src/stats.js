import React from 'react'
import {Card, Typography, CardContent, Button, Grid, CircularProgress, Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import StatCard from "./components/cpu-card.js"
import Disk from "./components/disk-card.js"
import "./Styles.css"
const apiURL = "https://ServerStatus.brysonvan1.repl.co/cpu"

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
            version: "Not Loaded"
        }
    }

    getStats(interupt){
        if(interupt){
            this.setState({isLoaded: false, items: "Loading..."})
        }
        fetch(apiURL).then(res => res.json()) .then(json => {
            this.setState ({
                isLoaded: true,
                cpu: {cpuPer: json.cpu.toString() + "%"},
                disk: {used: json.usedDisk, total: json.totalDisk},
                version: json.version.toString()
            })
        }).catch((err) => {
            console.error(err)
            this.setState({
                isLoaded: false,
                error: err.toString()
            })
        })
    }
    componentDidMount() {
        this.getStats(true)
        setTimeout(()=> {
            setInterval(() => {
                this.getStats(false);
            }, 2000)
        }, 5000)
        
     }
    
     componentDidUpdate(){
         console.log(this.state);
     }

    render() {
        return (
            <>
            <Grid container spacing={3}>
                <StatCard stat="CPU Usage" val={this.state.cpu.cpuPer} loading={this.state.isLoaded} />
                <Disk stat="Disk Usage" val={{used: this.state.disk.used, total: this.state.disk.total}} loading={this.state.isLoaded} />
            </Grid>
            <Button onClick={this.getStats.bind(this)}>
                Resync Stats
            </Button>
            <Typography className="version">{"Version: " + this.state.version}</Typography>
            <Snackbar open={this.state.error} autoHideDuration={3000}>
                <Alert severity="error">{this.state.error}</Alert>
            </Snackbar>
            </>
        )
    }
}

export default Stats