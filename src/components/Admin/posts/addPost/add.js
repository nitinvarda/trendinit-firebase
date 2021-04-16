import React, { useState,useContext } from 'react';

import { Redirect } from "react-router-dom";
import '../editPost/edit.css';

import marked from 'marked';

import { Form, Col, Container, Button } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import AppContext from '../../../appContext'
import firebase from '../../../../trendinitServices/index'



// this is functional component with react hooks

const Add = () => {
    const appState = useContext(AppContext)
    const [postStatus,setPostStatus] =useState('')
    const [post, setPost] = useState({
        title: " ",
        by: "",
        desc: "",
        category: "",
        imagename: "",
        articleImage: ""
    })



    const { title, by, desc, category, articleImage } = post;
    const marked_desc = marked(desc);



    // this is submit funciton for adding post
    const addPost = async(e) => {
        e.preventDefault();
        try{
            const addPost = await firebase.articles.create({
                title,
                by,
                desc:marked_desc,
                category,
                articleImage
            })
            console.log(addPost)
        }
        catch(err){
            console.log(err)

        }

        

    }
    // this handles the form elements when changed 
    const onChange = (e) => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }
    // this handles the image files in the form
    const fileHandler = (e) => {
        setPost({
            ...post, articleImage: e.target.files[0]
        })
    }





    if (appState.isAuthenticated) {
        // if post is submitted successfully it gets a response as 'success'

        if (postStatus === 'success') {
            // after successful submission it redirects to admin-home
            return (<Redirect to="/admin-home" />)
        }
        else {
            return (
                <Container>
                    <h3 className='text-center my-2 pb-3'>Add an Article</h3>
                 
                    <Form className='formstyle' onSubmit={addPost}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name='title' onChange={onChange} placeholder="Enter Title" required />

                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="categoryType">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name='category' onChange={onChange} required >
                                    <option>Select a Category</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Technology">Technology</option>
                                    <option value="International">International</option>
                                    <option value="Others">Others</option>
                                </Form.Control>

                            </Form.Group>


                            <Form.Group as={Col} controlId="articleBy">
                                <Form.Label>By</Form.Label>
                                <Form.Control type='text' name='by' onChange={onChange} placeholder='Article By' required />

                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Col lg={6}>
                                <Form.File name="articleImage" onChange={fileHandler} label='Upload an Image' required />

                            </Col>


                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Group as={Col} controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as='textarea' name="desc" onChange={onChange} rows={5} required />

                            </Form.Group>

                        </Form.Row>
                        <Button variant='secondary' type='submit' block>Add Post</Button>

                    </Form>
                </Container>

            )
        }
    }
    else {
        return <Redirect to="/admin" />
    }
}



export default Add;


