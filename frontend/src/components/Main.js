import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Signup from './Signup'

export default function Main() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Signup}/>
                <Route path="/signup" component={Signup}/>
            </Switch>
        </div>
    )
}
