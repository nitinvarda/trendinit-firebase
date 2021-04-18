import React, { useState, useEffect,useContext } from 'react';
import { Redirect } from "react-router-dom";
import './edit.css';

import marked from 'marked';

import Loader from '../../../Loader'
import { Alert } from 'react-bootstrap';

import firebase from '../../../../trendinitServices/index'
import AppContext from '../../../appContext'


// this is functional component with react-hooks
const Edit = ({ history, match }) => {
    const appState = useContext(AppContext)
    const [updateStatus,setUpdateStatus] =useState('')
    const [post, setPost] = useState({
        title: " ",
        by: "",
        desc: "",
        category: "",
        imagename: "",
        date: "",
        myImage: ""
    })


    // bringing post id from adminhome to fetch data of that post from db
    // storing id in id variable
    const id = match.params.id;



    const { title, by, desc, category, date, myImage } = post;






    useEffect(() => {
       
        getPost(id)




    }, [id])
    const getPost = async(id)=>{
        console.log('id')
        try{
            const postDetails = await firebase.articles.getById(id)
            setPost(postDetails)
            console.log(postDetails)
        }
        catch(err){
            console.log(err)

        }
    }


    const marked_desc = marked(desc);

    const Submit = (e) => {
        e.preventDefault();
       

    }

    // handling form elements
    const onChange = (e) => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }
    // handling the img file
    const fileHandler = (e) => {
        setPost({
            ...post, myImage: e.target.files[0]
        })
    }
    // if updated successully
    if (appState.isAuthenticated) {


        if (updateStatus === 'success') {
            // it redirects to admin-home
            return (<Redirect to="/admin-home" />)
        }
        else {

            return (
                <div className="divstyle">
                   
                    <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Add Post
                <hr /></h3>
                    <form onSubmit={Submit} className="formstyle" >
                        <label><h4>Title</h4></label>
                        <input type="text" name="title" className="titletext" value={title} onChange={onChange} required />

                        <div className="catandby">
                            <div className="cat">
                                <div>
                                    <label><h4>Category: </h4></label>
                                </div>
                                <div>
                                    <select name="category" className="category" onChange={onChange} required>
                                        <option>Select Category</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Movies">Movies</option>
                                        <option value="Politics">Politics</option>
                                        <option value="Technology">Technology</option>
                                        <option value="International">International</option>
                                        <option value="Others">Others</option>
                                    </select>

                                </div>

                            </div>
                            <br />
                            <div className="by" >
                                <label><h4>by</h4></label>
                                <input type="text" name="by" className="byinput" value={by} onChange={onChange} required />

                            </div>
                        </div>
                        <br />
                        <label>upload an Image</label>
                        <input type="file" name="myImage" className="up-img" onChange={fileHandler} required />


                        <br />
                        <br />
                        <div className="desc">
                            <label><h4>Description</h4></label>
                            <textarea name="desc" rows="4" cols="50" value={desc} onChange={onChange} required />

                        </div>


                        <input type="submit" className="postbtn" defaultValue="POST" />
                    </form>



                </div>
            )
        }
    }
    else {
        return <Redirect to="/admin" />
    }
}








export default Edit;

