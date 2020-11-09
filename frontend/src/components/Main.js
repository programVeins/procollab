import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from './Admin'
import Dashboard from './Dashboard'
import Signin from './Signin'
import Signup from './Signup'

export default function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route exact path="/signup">
                    <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route exact path="/signin">
                    <Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route exact path="/admin">
                    <Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
            </Switch>
        </div>
    )
}
