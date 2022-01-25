import {Box, Typography, Modal, Button} from "@mui/material"
import React from "react";



class MinecraftWebsocketView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            connectedState: "Disconnected",
            messages: [],
            modalOverflowStyle: "visible", 
            websocketerror: null
        }
        this.websocket = null
        this.connectToWebsocket = this.connectToWebsocket.bind(this)
    }

    connectToWebsocket(){
        this.websocket = new WebSocket(this.props.stats.websocketip);
        
        this.websocket.addEventListener("open", () => {
            this.setState({connectedState: `Connected to ${this.props.stats.name} WebSocket`})
            this.setState({websocketerror: null})
        })
        this.websocket.addEventListener("error", (e)=> {
            this.setState({connectedState: "Something went wrong, please try again."})
            console.error("WebSocket Error: ",  e);
            this.setState({websocketerror: e});
        })
        this.websocket.addEventListener("message", (e) => {
            console.log(e.data)
            let msgObj = JSON.parse(e.data)
            if(msgObj.type === "message"){
                this.setState({messages: this.state.messages.concat(msgObj.msg)})
            }
            if(this.modalBox.clientHeight > (window.innerHeight*0.7)){
                this.setState({modalOverflowStyle: "scroll"})
            }
            this.messagesEnd.scrollIntoView({behavior: "smooth"})
        })
    }
    closeModal(){
        this.websocket.close();
        this.setState({modalOverflowStyle: "visible"})
        this.setState({messages: [], connectedState: "Disconnected"})
        this.props.handleClose();
    }

    render(){
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'rgba(179, 179, 179, 0.85)',
            padding: "10px",
            maxHeight: "70vh",
            overflowY: this.state.modalOverflowStyle
          };
          let errorButton;
          if(this.state.websocketerror){
            errorButton = (<Button onClick={()=> {alert("Failed to connect to " + this.state.websocketerror.target.url);}}>Show More Details</Button>)
          } else {
            errorButton = (null);
          }
        return (
            <Modal
            open={this.props.open}
            onClose={this.closeModal.bind(this)}
            aria-labelledby="WebSocket LiveView"
            aria-describedby="View live WebSocket information from the minecraft server."
            
            >
            <Box style={style} ref={(el) => { this.modalBox = el; }}>
                <center>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    WebSocket LiveView
                    </Typography>
                    <Typography variant="h6" style={{fontSize: "2vh"}}>For {this.props.stats.name} server</Typography>
                    <Button variant="filled" onClick={this.connectToWebsocket}>Reconnect to WebSocket</Button>
                    {errorButton}
                </center>
                <Typography variant="p" style={{fontFamily: "roboto"}}>Current State: {this.state.connectedState}</Typography>
                <div class="messages">
                    {
                        this.state.messages.map((message) => {
                            return (<><Typography style={{fontFamily: "roboto"}} variant="p" key={message.id}>{message}</Typography><br/></>)
                        })
                    }
                    <div id="scroll-dummy" ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
            </Box>
            </Modal>
        )
    }
}


export default MinecraftWebsocketView