import {AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core"
import {MenuIcon} from "@material-ui/icons/Menu"
import React from "react"

class Menu extends React.Component {
    render(){
        return(
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        ServerStatus Web Panel
                    </Typography>
                    <Button color="inherit">
                        Admin
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Menu