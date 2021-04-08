import React from 'react'
import {Card, Typography, CardContent} from '@material-ui/core'

class Stats extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            res: null
        }
    }

    componentDidMount() {
       
        fetch("http://api.mocki.io/v1/7633c913", {
                "method": "GET",
                "mode": 'no-cors'
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    res: response
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    

    render() {
        return (
            <Card variant="outlined">
                <CardContent>
                    <Typography color="primary">
                        CPU Stats:
                    </Typography>
                    <Typography color="secondary">
                        33%
                    </Typography>
                    <Typography>
                        {this.state.error}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default Stats