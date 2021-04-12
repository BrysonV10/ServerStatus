import {AppBar, Toolbar, Typography,  IconButton, Grid} from "@material-ui/core"
import LockIcon from '@material-ui/icons/Lock';
import React from "react"
import "./Styles.css"
export default class TopMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    } 
    render(){ 
            return (
            <>
            <AppBar position="sticky">
                <Toolbar className="navbar">
                <Grid container direction="row" justify="flex-start" alignItems="flex-end">
                    <Typography variant="h6">
                        ServerStatus Web Panel
                    </Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                        <Grid item>
                        <Typography color="inherit">
                            Admin Login
                        </Typography>
                        </Grid>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <LockIcon />
                        </IconButton>
                        </Grid>
                </Toolbar>
            </AppBar>
            </>
        )
        }
        }
