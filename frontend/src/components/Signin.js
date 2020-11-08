import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import '../themes/login.css'
import axios from 'axios';

const backEndUrl = "https://procollab-backeed.herokuapp.com/"

export default class Signin extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          toggle: false,
          redirect: false,
          loading: false,
          email: '',
          password: '',
          modalmess : 'Please enter both email and password.'
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggler = this.toggler.bind(this);
    }
    
    
    toggler(){
    this.setState({toggle: !this.state.toggle});
    }

    handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if ((this.state.email === '') || (this.state.password === '')) {
            this.toggler();
        }
        else{
            this.setState({loading: true});
            //this.props.updateEmail(this.state.email);
            const userData = {
            email: this.state.email,
            password: this.state.password
            }
            axios.post(backEndUrl + '/api/postlogin', { userData })
            .then(res => {  
                if (res.data.auth === 10) {
                this.setState({modalmess: 'You are already logged in'});
                this.toggler();
                this.setState({loading: false});
                }
                else if (res.data.auth === 1) {
                this.setState({modalmess: 'Email not found. Enter registered email address, or sign up to register'});
                this.toggler();
                this.setState({loading: false});
                }
                else if (res.data.auth === 2) {
                this.setState({modalmess: 'Incorrect password. Type the correct password'});
                this.toggler();
                this.setState({loading: false});
                }
                else if (res.data.auth === 0){
                //this.props.loginToggler();
                console.log(res)
                this.setState({redirect: true});
                this.setState({loading: false});
                this.props.setIsLoggedIn(true)
                }
            })
            .catch(error => {
            this.setState({modalmess: 'Server Error. Please try again later'});
            this.toggler();
            this.setState({loading: false});
            console.log('Post userData ', error.message);
            console.log("End of catch")
            });
        }
    }
    
    render() {
        if (this.props.isLoggedIn)
            return <Redirect to="/dashboard"/>
        return (
        <div className="profile-wrapper-l">
            <div className="profile-inner">
                {
                    this.state.loading ? <Spinner className="spinner" color="danger" size="lg"/> :
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="font-bold">Sign In</h3>
                        <br/>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" id="email" className="form-control"
                            placeholder="Enter email" onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" id="password" className="form-control"
                            placeholder="Enter password" onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-danger btn-block">Sign In</button>
                        <br/>
                        <p className="forgot-password text-right">
                            Don't have an account? <Link to="/signup" className="links">Sign Up</Link>
                        </p>
                    </form>
                }
                
            </div>
            <Modal isOpen={this.state.toggle} toggle={this.toggler}>
                <ModalHeader toggle={this.toggler}>Error</ModalHeader>
                <ModalBody>
                {this.state.modalmess}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.toggler}>Back</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
        );
    }
}


    
