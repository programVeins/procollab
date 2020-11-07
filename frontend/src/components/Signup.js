import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../themes/login.css'
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { MenuItem, Select } from "@material-ui/core";

const backEndUrl = "http://localhost:5000"

export default class SignUp extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          toggle: false,
          loading: false,

          firstname: '',
          lastname: '',
          dept: '',
          email: '',
          password: '',
          isStud: true,
          modalmess : 'Please fill all required fields',
          touched: {
            firstname: false,
            lastname: false,
            dept: false,
            email: false,
            password: false,
            isStud: false
          }
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
    
        this.setState({
          touched : {
            firstname: true,
            lastname: true,
            dept: true,
            email: true,
            password: true,
            isStud: true
          }
        });
    
        if ((this.state.firstname === '') || (this.state.lastname === '') ||
        (this.state.email === '') || (this.state.dept === '') || (this.state.password === '')) {
          this.toggler();
        }
        else {
          this.setState({loading: true});
          const userData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            dept: this.state.dept,
            password: this.state.password,
            isStud: this.state.isStud
          }
      
          axios.post(backEndUrl + '/api/postsignup', { userData })
            .then(res => {  
                if (res.data.error === 1) {
                  this.setState({modalmess: "Email already exists."});
                  this.toggler();
                  this.setState({loading: false});
                }
                else {
                  this.setState({loading: false});
                  <Redirect to="/dashboard"/>
                }    
            })
            .catch(error => {
              console.log('Post userData ', error.message);
              alert('Your userData could not be posted.\nError: ' + error.message);
              console.log("End of catch")
            });
        }
        
      }

    handleBlur = (field) => (evt) =>   {
        this.setState({
            touched: {...this.state.touched, [field]: true} 
        })
    }
    
    
    validate(firstname, lastname, dept, email, password) {
        const errors = {
            firstname: '',
            lastname: '',
            dept: '',
            email: '',
            password: ''
        };
    
        if(this.state.touched.firstname && firstname.length === 0) 
            errors.firstname = "Required";
        if(this.state.touched.lastname && lastname.length === 0) 
            errors.lastname = "Required";   
        if(this.state.touched.email && email.length === 0)
          errors.email = "Required";
        else if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = "Emails should contain an '@'";
        if(this.state.touched.dept && dept.length === 0)
            { errors.dept = "Required"; }
        if(this.state.touched.password && password.length === 0)
          {errors.password = "Required";}
    
        return errors;
    
    }
    
    render() {
        const errors = this.validate(this.state.firstname, this.state.lastname,
            this.state.dept, this.state.email, this.state.password); 
        return (
            <div className="profile-wrapper">
                <div className="profile-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="font-bold">Sign Up</h2>
                        <div className="form-group">
                            <label className="font-med">First name</label>
                            <input id="firstname" name="firstname" type="text" className="form-control"
                             placeholder="First name" onChange={this.handleInputChange}
                             value={this.state.firstname}
                             valid={errors.firstname === ''}
                             invalid={errors.firstname !== ''}
                             onBlur={this.handleBlur('firstname')}/>
                             <FormFeedback className="d-block px-1">{errors.firstname}</FormFeedback>
                        </div>

                        <div className="form-group">
                            <label className="font-med">Last name</label>
                            <input id="lastname" name="lastname" type="text" className="form-control"
                             placeholder="Last name" onChange={this.handleInputChange}
                             value={this.state.lastname}
                             valid={errors.lastname === ''}
                             invalid={errors.lastname !== ''}
                             onBlur={this.handleBlur('lastname')}/>
                             <FormFeedback className="d-block px-1">{errors.lastname}</FormFeedback>
                        </div>

                        

                        <div className="form-group">
                            <label className="font-med">Email address</label>
                            <input id="email" name="email" type="email" className="form-control"
                             placeholder="Enter Email" onChange={this.handleInputChange}
                             value={this.state.email}
                             valid={errors.email === ''}
                             invalid={errors.email !== ''}
                             onBlur={this.handleBlur('email')}/>
                             <FormFeedback className="d-block px-1">{errors.email}</FormFeedback>
                        </div>

                        <div className="form-group">
                            <label className="font-med">Password</label>
                            <input id="password" name="password" type="password" className="form-control"
                             placeholder="Enter Password" onChange={this.handleInputChange}
                             value={this.state.password}
                             valid={errors.password === ''}
                             invalid={errors.password !== ''}
                             onBlur={this.handleBlur('password')}/>
                             <FormFeedback className="d-block px-1">{errors.password}</FormFeedback>
                        </div>

                        <div className="form-group picker-group">
                         <label className="font-med" for="dept">Department</label>
                          <Select
                            id="dept" name="dept"
                            className="picker"
                            placeholder="Department" onChange={this.handleInputChange}
                            value={this.state.dept}
                            valid={errors.dept === ''}
                            invalid={errors.dept !== ''}
                            onBlur={this.handleBlur('dept')} 
                          >
                            <MenuItem value="CSE">CSE</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="BME">BME</MenuItem>
                            <MenuItem value="EEE">EEE</MenuItem>
                            <MenuItem value="Mech">Mech</MenuItem>
                            <MenuItem value="ECE">ECE</MenuItem>
                            <MenuItem value="Chem">Chem</MenuItem>
                            <MenuItem value="Civil">Civil</MenuItem>
                          </Select>
                          <FormFeedback className="d-block px-1">{errors.dept}</FormFeedback>
                        </div>

                        <div className="form-group">
                          <label className="font-med mr-5">Are you a Student?</label>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input"/>
                            <label class="custom-control-label" for="customRadioInline1">Yes</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input"/>
                            <label class="custom-control-label" for="customRadioInline2">No</label>
                          </div>
                        </div>

                        <br/>
                        <button type="submit" className="btn btn-danger btn-block dark"><p className="font-bold">Sign Up</p></button>
                        <br/>
                        <p className="forgot-password text-center">
                        Already have an account? <Link to="/sign-in" className="links">Sign In</Link>
                        </p>
                    </form>
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
