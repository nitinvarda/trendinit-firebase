import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// import './Post.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Row, Col, Container, Alert } from 'react-bootstrap'


import Loader from '../../../Loader';

import firebase from '../../../../trendinitServices/index'

// this is functional component with react-hooks
const Post = (props) => {
    const articleLoading=false
    const [item, setItem] = useState([]);

    // bringing post id from home to fetch data of that post from db
    // storing id in id variable
    const id = props.match.params.id

 
    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        getPost(id)
       
    }, [id])
    const getPost = async(id)=>{
        console.log('id')
        try{
            const postDetails = await firebase.articles.getById(id)
            setItem(postDetails)
            console.log(postDetails)
        }
        catch(err){
            console.log(err)

        }
    }
    const { title, category, createdAt, by, desc, image } = item;
    // console.log(typeof )
    const date = new Date(null)
    console.log((date.setTime(createdAt?.seconds * 1000)).toLocaleString())
    console.log(createdAt?.toMillis())
    if (title) {
        var split = title.split(" ")
        var breadName = split[1] + " " + split[2]


    }

    if (articleLoading) {
        return <Loader />

    }
    else {


        return (
            <div>
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href={'/category/' + category}>{category}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{breadName}</Breadcrumb.Item>

                    </Breadcrumb>
                </Container>
              
                <div className=" post-details">
                    <img src={image} className="post-img" alt="post img" />

                    <div className="post-title" >
                        <br />
                        <h4 style={{ textAlign: "center" }} >{title}</h4>
                    </div>
                    <hr />



                </div>
                <Container>

                    <Row >


                        <Col xs={6} md={4} >
                            <h5>By: <Link to={"/by/" + by}>{by}</Link> </h5>

                        </Col>
                        <Col xs={6} md={4} >
                            <h5>Category: <Link to={"/category/" + category} >{category}</Link></h5>

                        </Col>
                        <Col xs={12} md={4} >
                            <h5>Date: {(new Date(createdAt?.toMillis())).toUTCString()}</h5>

                        </Col>


                        <br />
                        <Col >
                            <ReactMarkdown className='post_desc' source={desc} escapeHtml={false} />
                        </Col>



                    </Row>
                </Container>






            </div>

        )
    }


}

export default Post;




