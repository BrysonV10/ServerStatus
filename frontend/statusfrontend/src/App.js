import './Styles.css';
import React from 'react'
import TopMenu from "./menu"
import Stats from "./stats"
import Admin from "./admin"
import { Switch, BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const ProtectedRoute = (props) => {
  const {isAuthenticated} = useAuth0()
  console.log("Checking Auth - " + isAuthenticated.toString())
  if(isAuthenticated){
    return (
      
      <><br/>{props.children}</>
    )
  } else {
    return (<Redirect to={"/"}/>)
  }
}

function App() {
  
  return (
    <div className="App">
      <Router>
      <TopMenu />
      <br/>
      
        <Switch>
          <Route exact path="/">
            <Stats/>
          </Route>
          <Route path="/admin">
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App
