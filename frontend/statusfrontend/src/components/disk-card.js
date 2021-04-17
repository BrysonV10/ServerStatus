import React from "react"
import {Box, CircularProgress, Typography, Grid, Card, CardContent} from "@material-ui/core"
import "../Styles.css"

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
      if(prevProps.val != this.props.val){
        this.setState({
          percent: (this.props.val.used / this.props.val.total) * 100
        })
      }
      if(this.props.val != prevProps.val){
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
        return (
        <Grid item >
                <Card variant="outlined"  >
                <CardContent className={this.state.color}>
                    <Typography variant="h5">
                        {this.props.stat}
                    </Typography>
                <center>
                    <CircularProgressWithLabel thickness={5} value={this.state.percent} color="inherit"/>
                </center>
                </CardContent>
                </Card>
            </Grid>
        )
    }
}


export default Disk