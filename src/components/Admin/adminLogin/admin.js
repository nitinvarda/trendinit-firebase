import React, { useState,useContext } from 'react';

import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import Loader from '../../Loader'
import ErrorMessage from '../../ErrorMessage'

import firebase from '../../../trendinitServices/index'
// import { TextField, Button, FormGroup } from '@material-ui/core'
import './admin.css';

// context
import AppContext from '../../appContext'

const Admin = () => {
    const appState = useContext(AppContext)
    const [isLoading,setIsLoading] =useState(false)
    const [error,setError] = useState('')
    const [defaultForm,setDefaultForm] = useState('login')
    
    const [details, setDetails] = useState({
        email: '',
        password: '',
        username:''
    })

   

    // handling form elements
    const onChange = (e) => {
        setDetails({
            ...details, [e.target.name]: e.target.value
        })
    }
    // submit function
    
    const { username, password,email } = details;


    const loginUser = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        try{
         
            const loggedInUser = await firebase.admin.login(email,password)
            appState.updateUser(loggedInUser)
            appState.updateIsAuthenticated(true)
            setIsLoading(false)
        }
        catch(err){
            setError(err.message)
            setTimeout(()=>{
                setError('')
            },3000)
            
        }
    }

    const registerUser = async(e)=>{
        e.preventDefault()
        try{
            const registerUser = await firebase.admin.register(email,password,username)
            appState.updateUser(registerUser)
            appState.updateIsAuthenticated(true)

        }
        catch(err){
            console.log(err)
            setError(err.message)
            setTimeout(()=>{
                setError('')
            },3000)
        }
    }


    console.log(appState)
    const loginOrRegister = (name)=>{
        switch(name){
            case 'login':
                return(
                    <Card>
                                <Card.Header className="text-center" style={{ fontFamil: 'Sen', fontSize: 25, fontWeight: 700 }}>LOGIN HERE</Card.Header>
                                <Card.Body>
                                    <Form autoComplete="off" onSubmit={loginUser} >
                                        <Form.Group controlId="forEmail" >
                                            <Form.Label >Email</Form.Label>
                                            <Form.Control type="text" data-testid="email" name="email" placeholder="Enter email" required onChange={onChange} />

                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label >password</Form.Label>
                                            <Form.Control type="password" data-testid="password" name="password" placeholder="Enter Password" required onChange={onChange} />

                                        </Form.Group>
                                        {error && <ErrorMessage error={error} />}
                                        <p>New user? <Button onClick={()=>setDefaultForm('register')}>register here</Button></p>
                                        <div style={{ width: "50%", margin: 'auto' }}>
                                            <Button data-testid='button' style={{ width: "90%" }} variant="danger" type="submit" size="lg" >Login</Button>
                                        </div>


                                    </Form>
                                </Card.Body>
                            </Card>
                )
            case 'register':
                return(
                    <Card>
                                <Card.Header className="text-center" style={{ fontFamil: 'Sen', fontSize: 25, fontWeight: 700 }}>REGISTER HERE</Card.Header>
                                <Card.Body>
                                    <Form autoComplete="off" onSubmit={registerUser} >
                                    <Form.Group controlId="forUserName" >
                                            <Form.Label >Username</Form.Label>
                                            <Form.Control type="text" data-testid="username" name="username" placeholder="Enter Username" required onChange={onChange} />

                                        </Form.Group>
                                        <Form.Group controlId="forEmail" >
                                            <Form.Label >Email</Form.Label>
                                            <Form.Control type="email" data-testid="email" name="email" placeholder="Enter Email" required onChange={onChange} />

                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label >password</Form.Label>
                                            <Form.Control type="password" data-testid="password" name="password" placeholder="Enter Password" required onChange={onChange} />

                                        </Form.Group>
                                        {error && <ErrorMessage error={error} />}
                                        <p>Already user? <Button onClick={()=>setDefaultForm('login')}>login here</Button></p>
                                        <div style={{ width: "50%", margin: 'auto' }}>
                                            <Button data-testid='button' style={{ width: "90%" }} variant="danger" type="submit" size="lg" >Register</Button>
                                        </div>


                                    </Form>
                                </Card.Body>
                            </Card>
                )
            default:
                return(<div></div>)
        }
    }
    if (isLoading) {
        return <Loader />
    }
    else {



        if (appState.isAuthenticated) {
            // if user is authenticated redirect to admin-home
            return <Redirect to="/admin-home" />
        }
        else {
            return (
                <Container >



                    <Row >
                        <Col md={6} className="my-auto" >

                            <h1 className='my-5 login-heading text-center' >Admin ?</h1>

                        </Col>
                        <Col md={6} className='my-5'>
                        {loginOrRegister(defaultForm)}
                           
                            
                        </Col>
                    </Row>
                </Container>





            );
        }
    }
}

// default proptypes for this component
Admin.propTypes = {
    isAuthenticated: PropTypes.bool
}


export default Admin;
