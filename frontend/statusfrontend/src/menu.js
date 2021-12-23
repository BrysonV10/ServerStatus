import {AppBar, Toolbar, Typography,  IconButton, Grid} from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import React from "react"
import "./Styles.css"
import { useAuth0 } from "@auth0/auth0-react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link} from "react-router-dom"
const AdminLogInButton = () => {
    const {loginWithRedirect, user, isAuthenticated} = useAuth0()
    let to;
    if(window.location.pathname === "/") {to = "/admin";}
    if(window.location.pathname == "/admin"){to = "/"}
    if(isAuthenticated == false){
        return (
            <>
            <Grid item>
                <Typography color="inherit">
                    <Link to={to} style={{color: "white", textDecoration: "none"}}>Admin Login</Link>
                </Typography>
            </Grid>
            <Grid item>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => loginWithRedirect()}>
                <LockIcon />
            </IconButton>
            </Grid>
            </>
        )
    } else {
        return (null)
    }
    
}

const AdminLogOutButton = () => {
    const { logout, isAuthenticated } = useAuth0()
    let to;
    if(window.location.pathname === "/") {to = "/admin";}
    if(window.location.pathname === "/admin"){to = "/"}
    if(isAuthenticated){
        return (
            <>
            <Grid item>
            <Typography color="inherit">
                <Link to={to} style={{color: "white", textDecoration: "none"}}>
                    Admin Logout
                </Link>
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => logout()}>
                <LockOpenIcon />
            </IconButton>
            </Grid>
            </>
        )
    } else {
        return (null)
    }
    
}

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
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Typography variant="h6">
                        <Link to={"/"} style={{color: "white", textDecoration: "none"}}>ServerStatus Web Panel</Link>
                    </Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                        <AdminLogInButton/>
                        <AdminLogOutButton/>
                    </Grid>
                </Toolbar>
            </AppBar>
            </>
        )
        } 
        }
