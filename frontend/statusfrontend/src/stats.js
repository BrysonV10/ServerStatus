import React from 'react'
import {Card, Typography, CardContent, Button, Grid, CircularProgress, Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import "./Styles.css"
const apiURL = "https://ServerStatus.brysonvan1.repl.co/cpu"

function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CircleLoader(props){
    if(props.hide){
        return null
    } else {
        return (<CircularProgress />)
    }
}

class Stats extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            items: "Not Loaded",
            version: "Not Loaded"
        }
    }

    getStats(){
        this.setState({isLoaded: false, items: "Loading..."})
        fetch(apiURL).then(res => res.json() ) .then(json => {
         
        this.setState ({
              isLoaded: true,
              items: json.cpu.toString() + "%",
              version: json.version.toString()
           })
        }).catch((err) => {
            console.log(err)
            this.setState({
                isLoaded: false,
                error: err.toString()
            })
        })
    }
    componentDidMount() {
        this.getStats()
     }
    
    render() {
        return (
            <>
            <Grid container spacing={3}>
                <Grid item >
                <Card variant="outlined" >
                <CardContent className="stat">
                    <CircleLoader hide={this.state.isLoaded} />
                    <Typography variant="h5">
                        CPU Usage:
                    </Typography>
                    <Typography variant="h6" className="statNum">
                       {this.state.items}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
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