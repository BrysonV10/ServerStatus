import React from "react"
import {Box, Grid, Card, CardContent, CircularProgress, Typography, IconButton} from "@mui/material"
import "../Styles.css"

import CpuModal from "./cpu-graph";
function CircleLoader(props){
    if(props.hide){
        return null
    } else {
        return (<CircularProgress />)
    }
}

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" className="circlebar" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">
            <strong>
            {`${Math.round(
            props.value,
          )}%`}
            </strong>
            </Typography>
        </Box>
      </Box>
    );
  }

class StatCard extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state ={
            color: "gray-card",
            modalOpen: false
        }
        this.changeModalState = this.changeModalState.bind(this)
    }
    
    componentDidMount(){
        this.mounted = true;
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.mounted) return;
        if(this.props.val === "undefined" || !this.props.val) return;
        let percent = this.props.val
        percent = parseInt(percent);
        if(percent > 0 && percent < 25){
            if(prevState.color === "gray-card") return;
            this.setState({color: "gray-card"});
            return;
        } else if(percent >25 && percent < 50){
            if(prevState.color === "yellow-card") return;
            this.setState({color: "yellow-card"});
            return;
        } else if(percent >=50 && percent<74){
            if(prevState.color === "orange-card") return;
            this.setState({color: "orange-card"});
            return;
        } else if(percent >74) {
            if(prevState.color === "red-card") return;
            this.setState({color: "red-card"});
            return;
        }
    }
    changeModalState(){
        if(this.state.modalOpen){
            this.setState({modalOpen: false});
        } else {
            this.setState({modalOpen: true});
        }
    }
    render(){
        return (
            <Grid item >
                <Card variant="outlined"  >
                <CardContent className={this.state.color}>
                <center>
                    <CircleLoader hide={this.props.loading} />
                    
                    <Typography variant="h5">
                        {this.props.stat}
                        
                    </Typography>
                        
                    <IconButton edge="start" color="inherit" aria-label="CPU Live View" onClick={this.changeModalState}>
                        <CircularProgressWithLabel thickness={5} value={this.props.val} color="inherit"/>
                    </IconButton>
                    <br/>
                    <Typography variant="p" style={{fontFamily: 'Roboto'}}>{this.props.extraInfo}</Typography>
                    <br/> 
                    
                    <CpuModal cpuStat={this.props.val} open={this.state.modalOpen} handleClose={this.changeModalState}/>
                    </center>
                </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default StatCard