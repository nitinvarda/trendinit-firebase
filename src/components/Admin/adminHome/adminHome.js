import React, {useState, useEffect } from 'react';


import Loader from '../../Loader'
import { Alert, Row, Col, Image, Button } from 'react-bootstrap'

import {
    Link,
    Redirect
} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import './adminhome.css';


// this is functional component with react hooks
const AdminHome = (props) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const pageNumber = props.match.params.pageNumber || 1
    const articles = []

    // delete post button function
    const delPost = (e) => {
       
    }
    const Logout = () => {
       
    }

  

    // using useEffect to bring posts from db as soon this component renders
    useEffect(() => {



    }, [pageNumber])








    // checking user authentication
    if (isAuthenticated) {
        // if any post is deleted it get result as deleted 
        // then page is reloaded to see the changes

        return (
            <div className="container admin-home-start">
           

                <div className="welcome-admin">
                    <h1 style={{ textAlign: 'left' }}>Welcome Admin</h1>
                    <div className="d-flex justify-content-between">

                        <Link to="/add" className="btn btn-primary btn-sm">New Post</Link>
                        <button className="btn btn-danger btn-sm" onClick={Logout}>Logout</button>

                    </div>
                </div>
                <hr />

                <Row className="row">
                    {articles.map((item, i) => (
                        <React.Fragment key={i}>
                            <Col lg={5} className="">
                                <Link to={"/admin-post/" + item._id} >
                                    <Image src={"/image/" + item.imagename} alt="post img" fluid />
                                </Link>
                            </Col>
                            <Col lg={7}  >
                                <h3><Link to={"/admin-post/" + item._id} >{item.title}</Link></h3>
                                <br />
                                <h5>Article by:<b><i>{item.by}</i></b> --&nbsp; Category:<b><i> {item.category}</i></b> --&nbsp; Date: {item.date.substring(0, 10)}  </h5>
                                <br />

                                <h4 className="admin-home-desc"><ReactMarkdown source={item.desc} escapeHtml={false} /></h4>
                                <br />

                                <Button variant="secondary" type="button" className="btn btn-secondary"><Link to={{ pathname: "/edit/" + item._id }} style={{ color: "white" }}>Edit</Link></Button>
                                <Button variant="danger" onClick={delPost} id={item._id} type="button" className="btn btn-danger del">Delete</Button>
                                <hr />
                            </Col>
                        </React.Fragment>
                    ))}
                </Row>

            </div>

        )

    }

    else {
        // if user is not authenticated it redirects to admin login page
        return <Redirect to="/admin" />
    }

}





export default AdminHome;


