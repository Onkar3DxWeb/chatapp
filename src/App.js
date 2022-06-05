import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

 import { AuthProvider } from "./contexts/AuthContext"

 import Chats from "./components/Chats"
 import Login from "./components/Login"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        { <AuthProvider> 
          <Switch>
           
            <Route exact path="/" component={Login} />
            <Route exact path="/chats" component={Chats} />
          </Switch>
        </AuthProvider>}
      </Router>
    </div>
  )
}

export default App