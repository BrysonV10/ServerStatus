import React from "react"
import {Grid, Card, CardContent, CircularProgress, Typography} from "@material-ui/core"
import "../Styles.css"

function CircleLoader(props){
    if(props.hide){
        return null
    } else {
        return (<CircularProgress />)
    }
}


class StatCard extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state ={
            color: "gray-card"
        }
    }
    
    componentDidMount(){
        this.mounted = true;
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.mounted) return;
        if(this.props.val == "undefined" || !this.props.val) return;
        let percent = this.props.val.slice(0, this.props.val.length-1)
        percent = parseInt(percent);
        if(percent > 0 && percent < 25){
            if(prevState.color == "gray-card") return;
            this.setState({color: "gray-card"});
            return;
        } else if(percent >25 && percent < 50){
            if(prevState.color == "yellow-card") return;
            this.setState({color: "yellow-card"});
            return;
        } else if(percent >=50 && percent<74){
            if(prevState.color == "orange-card") return;
            this.setState({color: "orange-card"});
            return;
        } else if(percent >74) {
            if(prevState.color == "red-card") return;
            this.setState({color: "red-card"});
            return;
        }
    }

    render(){
        return (
            <Grid item >
                <Card variant="outlined"  >
                <CardContent className={this.state.color}>
                    <CircleLoader hide={this.props.loading} />
                    <Typography variant="h5">
                        {this.props.stat}
                    </Typography>
                    <Typography variant="h6" className="statNum">
                       {this.props.val}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default StatCard