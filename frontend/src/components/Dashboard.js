import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Toast, ToastBody, ToastHeader} from 'reactstrap'
import axios from 'axios';

const backEndUrl = "https://procollab-backeed.herokuapp.com/"

export default function Dashboard(props) {

    const depts = [
        "Information Technology",
        "Computer Science Engineering",
        "Electonics and Communication Engineering",
        "Electrical and Electronic Engineering",
        "Civil Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Biomedical Engineering"
    ]

    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [modal, setmodal] = useState(false)
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedPos, setSelectedPos] = useState(null)
    const [positions, setPositions] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(backEndUrl + '/api/projdeets')
        .then(res => {
            setProjects(res.data.projects)
            setUsers(res.data.users)
            setPositions(res.data.positions)
            setLoading(false)
        })
        .catch(err => {
            console.log(err.mess)
            setLoading(false)
        })
        
    }, [])

    const logout = () => {
        props.setIsLoggedIn(false)
        setRedirect(true)
    }

    const findUser = (ofProject) => {
        if (users.length === 0)
            return null
        return  users.filter((u,i) => ofProject.ideaBy === u.id)[0]
    }

    const findPosition = (ofProject) => {
        if (positions.length === 0)
            return null
        return  positions.filter((p,i) => ofProject.position === p.id)[0]
    }

    const toggler = () => {
        setmodal(!modal)
    }

    const showDeets = (user, pos) => {
        toggler()
        setSelectedUser(user)
        setSelectedPos(pos)
    }

    if(redirect)
        return <Redirect to="/signin"/>
    return (
        <div>
            <div className="container">
                <br/><br/><br/><br/>
                <div className="topbar">
                    <h2 className="fleft">Dashboard - Projects</h2>
                    <Button className="btn btn-danger fright" size="md"
                    onClick={logout}>Logout</Button>
                </div>
                <hr/>
                {
                    loading? <Spinner className="text-center mt-5" color="danger" size="lg"/> : null
                }
                {
                    projects.map((p,i) => {
                        return (
                            <div className="p-3 bg-danger my-5 rounded">
                                <Toast>
                                    <ToastHeader>
                                        Project Name: {p.name}
                                    </ToastHeader>
                                    <ToastBody className="text-left">
                                        Position Needed: {findPosition(p) === null ? null : findPosition(p).name}
                                        <br/>
                                        Posted by: {findUser(p) === null ? null : findUser(p).firstname}
                                    </ToastBody>
                                </Toast>
                                <Button className="btn btn-warning fright"
                                onClick={() => showDeets(findUser(p), findPosition(p))}>Details</Button>
                            </div>
                        );
                    })
                }
                
                <br/><br/><br/><br/><br/><br/>
            </div>
            {
                selectedUser ? 
                <Modal isOpen={modal} toggle={toggler}>
                    <ModalHeader toggle={toggler}>More Details</ModalHeader>
                    <ModalBody>
                        <h4 className="mb-3 un">User Details</h4>
                        <h6>First Name : {selectedUser.firstname}</h6>
                        <h6>Last Name : {selectedUser.lastname}</h6>
                        <h6>Department: {depts[selectedUser.dept - 1]}</h6>
                        <h6>Role : {selectedUser.isstud ? "Student" : "Faculty"}</h6>
                        <h6>Contact Email : {selectedUser.email}</h6>
                        <br/>
                        <h4 className="mb-3 un">Position Details</h4>
                        <h6>Position Needed: {selectedPos.name}</h6>
                        <h6>Position Description: {selectedPos.desc}</h6>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggler}>Back</Button>{' '}
                    </ModalFooter>
                </Modal> : null
            }
        </div>
    )
}
