import React from "react"
import {Modal, Box, Typography, Button} from "@mui/material"
import { LineChart, Line, CartesianGrid, YAxis, Area } from 'recharts';
class CpuModal extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            cpuHist: []
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps === this.props){return;}
        let newList = this.state.cpuHist;
        newList = newList.concat({val: this.props.cpuStat})
        console.log(newList.length)
        if(newList.length > 10){
            newList.splice(0, 1);
        }
        console.log(newList)
        this.setState({
            cpuHist: newList
        })
        console.log(this.state.cpuHist)
    }

    closeModal(){
        this.props.handleClose();
    }
    render(){
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "40vw",
            backgroundColor: 'rgba(179, 179, 179, 0.85)',
            padding: "10px",
            maxHeight: "80vh",
            overflowY: this.state.modalOverflowStyle
          };
          
        return (
            <Modal
            open={this.props.open}
            onClose={this.closeModal.bind(this)}
            aria-labelledby="CPU Graph"
            aria-describedby="View CPU usage graph"
            >
            <Box style={style}>
                <center><Typography style={{fontFamily: "roboto"}}>Live CPU Usage</Typography></center>
            <LineChart width={400} height={400} data={this.state.cpuHist}>
                <Line type="monotone" dataKey="val" stroke="#000000" />
                <CartesianGrid stroke="#ccc" />
                <YAxis domain={[0, 100]} tick={{ fill: "rgba(0, 0, 0, 1)", fontFamily: "roboto" }}/>
                <Area strokeWidth={2}
                dataKey="val"
                fillOpacity={0.6}
                fill="#243bad"/>
            </LineChart>
            </Box>
            </Modal>
        )
    }
}

export default CpuModal