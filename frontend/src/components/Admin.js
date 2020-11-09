import { Table , TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const backEndUrl = "https://procollab-backeed.herokuapp.com/"

export default function Admin() {

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

    const xpositions = [
        "UI/UX Designer",
        "Frontend Developer",
        "Backend Developer"
    ]

    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])
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

    return (
        <div>
            <div className="container">
                <h2 className="my-3">Users</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                First Name
                            </TableCell>
                            <TableCell>
                                Last Name
                            </TableCell>
                            <TableCell>
                                Email
                            </TableCell>
                            <TableCell>
                                Dept
                            </TableCell>
                            <TableCell>
                                Is Student?
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((u,i) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {u.firstname}
                                        </TableCell>
                                        <TableCell>
                                            {u.lastname}
                                        </TableCell>
                                        <TableCell>
                                            {u.email}
                                        </TableCell>
                                        <TableCell>
                                            {depts[u.dept - 1]}
                                        </TableCell>
                                        <TableCell>
                                            {u.isstud ? "Student" : "Faculty"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>

                <h2 className="my-3">Projects</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Project Name
                            </TableCell>
                            <TableCell>
                                Position Needed
                            </TableCell>
                            <TableCell>
                                Idea By
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            projects.map((u,i) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {u.name}
                                        </TableCell>
                                        <TableCell>
                                            {xpositions[u.position - 1]}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                users[0] ? users[u.ideaBy - 1].firstname : null}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>

                <h2 className="my-3">Positions</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Position Name
                            </TableCell>
                            <TableCell>
                                Position Desc
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            positions.map((u,i) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {u.name}
                                        </TableCell>
                                        <TableCell>
                                            {u.desc}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
