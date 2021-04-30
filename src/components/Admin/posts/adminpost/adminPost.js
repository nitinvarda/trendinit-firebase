import React, { useState, useEffect,useContext } from 'react';

import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../../../Homepage/posts/post/Post.css';

import appContext from '../../../appContext'

// import { Alert } from 'react-bootstrap'
// import Loader from '../../../Loader'

const AdminPost = (props) => {
    const AppState = useContext(appContext)
    const [deleteStatus,setDeleteStatus] =useState(false)
    const [post, setPost] = useState([]);

    // we are getting into post details and this comonent recieves id as props from admin-home
    // which we use for fetching the relavent post from db
    // the recieved id as props is saved to id variable
    const id = props.match.params.id

   

    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
       setPost([])
    }, [id])
    const { title, date, by, desc, imagename, _id } = post;

    // for deleting the post 
    const delPost = (e) => {
        setDeleteStatus('')
       
    }
    // if deleted successfully
    if (AppState.isAuthenticated) {


        if (deleteStatus === "deleted") {
            // it redirects to admin-home
            return (<Redirect to="/admin-home" />)
        }
        else {
            return (
                <div className="container post">
                
                    <div className="post-start">
                        <div className=" post-details">
                            <img src={"/image/" + imagename} className="post-img" alt="post img" />
                            <br />
                            <div className="post-title" >
                                <h3 >{title}</h3>
                                <buttton type="button" className="btn btn-secondary"><Link to={{ pathname: "/edit/" + _id }} style={{ color: "white" }}>Edit</Link></buttton>
                                <button onClick={delPost} id={_id} type="button" className="btn btn-danger del">Delete</button>
                            </div>
                            <hr />



                        </div>
                        <div className="post-desc">


                            <h6>By:<Link to={"/by/" + by}>{by}</Link>--Date:{date}</h6>
                            <br />
                            <ReactMarkdown source={desc} escapeHtml={false} />



                        </div>




                    </div>

                </div>

            )
        }
    }
    else {
        return <Redirect to="/admin" />
    }
}

// bringing state to props in this component


export default AdminPost;
