import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Toast, ToastBody, ToastHeader} from 'reactstrap'

export default function Dashboard(props) {

    const [redirect, setRedirect] = useState(false)

    const projects = [
        {
            id: 1,
            name: "Diabolical",
            position: "Frontend developer",
            createdUser: "Meganathan"
        },
        {
            id: 2,
            name: "Astral Projection",
            position: "Backend developer",
            createdUser: "Sabesh"
        },
        {
            id: 3,
            name: "Time Travel",
            position: "UI UX Designer",
            createdUser: "Kabilan"
        }
    ]

    const logout = () => {
        props.setIsLoggedIn(false)
        setRedirect(true)
    }

    if(redirect)
        return <Redirect to="/signin"/>
    return (
        <div>
            <div className="container">
                <br/><br/><br/><br/>
                <div className="topbar">
                    <h2 className="header">Dashboard - Projects</h2>
                    <Button className="btn btn-danger logout" size="md"
                    onClick={logout}>Logout</Button>
                </div>
                <hr/>
                {
                    projects.map((p,i) => {
                        return (
                            <div className="p-3 bg-danger my-5 rounded">
                                <Toast>
                                    <ToastHeader>
                                        Project Name: {p.name}
                                    </ToastHeader>
                                    <ToastBody>
                                        Position Needed: {p.position}
                                    </ToastBody>
                                </Toast>
                            </div>
                        );
                    })
                }
                
                <br/><br/><br/><br/><br/><br/>
            </div> 
        </div>
    )
}
