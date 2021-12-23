import React from "react"
import {Box, CircularProgress, Typography, Grid, Card, CardContent} from "@mui/material"
import "../Styles.css"

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
function humanFileSize(bytes, si=false, dp=1) {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = si 
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  
    return bytes.toFixed(dp) + ' ' + units[u];
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


class Disk extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          percent: (this.props.val.used / this.props.val.total) * 100,
          color: "gray-card"
        }
    }
    componentDidUpdate(prevProps, prevState){
      if(prevProps.val !== this.props.val){
        this.setState({
          percent: (this.props.val.used / this.props.val.total) * 100
        })
      }
      if(this.props.val !== prevProps.val){
        if(this.state.percent >=75){
          this.setState({
            color: "red-card"
          })
        } else if(this.state.percent <75 && this.state.percent >=50){
          this.setState({
            color: "orange-card"
          })
        } else if(this.state.percent <50 && this.state.percent >= 25){
          this.setState({
            color: "yellow-card"
          })
        } else {
          this.setState({
            color: "gray-card"
          })
        }
      }
    }
    render(){
        let niceTotal = "Total Space: " + humanFileSize(this.props.val.total);
        return (
        <Grid item >
                <Card variant="outlined"  >
                <CardContent className={this.state.color}>
                <center>
                    <Typography variant="h5">
                        {this.props.stat}
                    </Typography>
                    <CircularProgressWithLabel thickness={5} value={this.state.percent} color="inherit"/>
                    <br/>
                    <Typography variant="p" style={{fontFamily: "roboto"}}>{niceTotal}</Typography>
                </center>
                </CardContent>
                </Card>
            </Grid>
        )
    }
}


export default Disk