import './Styles.css';
import React from 'react'
import TopMenu from "./menu"
import Stats from "./stats"
import Admin from "./admin"
import { Switch, BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAI6ipe1qWXcRNiiCi1HQ5YEmVVpwQ4hXU",
    authDomain: "serverstatus-diegelnetwork.firebaseapp.com",
    projectId: "serverstatus-diegelnetwork",
    storageBucket: "serverstatus-diegelnetwork.appspot.com",
    messagingSenderId: "884694640943",
    appId: "1:884694640943:web:9fb50f1eb657687ab599da",
    measurementId: "G-QZQBJKTLZ0"
  };
  const app = initializeApp(firebaseConfig);
 
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
            <Stats app={app}/>
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
