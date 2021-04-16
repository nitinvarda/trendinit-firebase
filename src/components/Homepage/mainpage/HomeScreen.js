import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Pagination, Badge, Alert } from 'react-bootstrap'

import './Homepage.css'
import Loader from '../../Loader'

import Article from '../../Article'

import firebase from '../../../trendinitServices/index'







// this is functional component with react hooks
const HomeScreen = (props) => {
    const articles = []
    const pages =1
    const isLoading=false
    const pageNumber = props.match.params.pageNumber || 1


    
    // useEffect is similar to componentDidMount() in class component ,
    //  it fetces the data as soon as component is rendered
    useEffect(() => {
        getArticles()

    }, [pageNumber])

    const getArticles = async()=>{
        try{
            const articles = await firebase.articles.read()
            console.log(articles)
        }
        catch(err){
            console.log(err)
        }
    }

    // this is for the top three latest posts

    const posts = articles.slice(0, 3);
    // this is for all other posts
    const oldposts = articles.slice(3);



    let pagination = []
    for (let number = 1; number <= pages; number++) {
        pagination.push(
            <Pagination.Item key={number} active={number === pageNumber}
                href={number === 1 ? '/' : '/page/' + number}>
                {number}
            </Pagination.Item>,
        );
    }
    if(isLoading){

        return <Loader />
    }
    else{

    

    return (
        <React.Fragment>
            <div className="main-content" >
               
               
                {/*  */}
                <Row noGutters >
                    {posts.map((item, i) => {
                        return (
                            <Col sm={4} key={i}>
                                <Link to={"/post/" + item._id} style={{ color: 'white', textDecoration: 'none' }} >
                                    <div className="first" style={{ backgroundImage: `url(${"/image/" + item.imagename})` }} >
                                        <div className="text ">
                                            <h4 data-testid='article'> {item.title} </h4>

                                        </div>
                                        <div className="overlay"></div>
                                    </div>
                                </Link>
                            </Col>
                        )

                    })}

                </Row>

                <hr />

                <div className="container ">
                    <div className="category-mobile">
                        <h4 className="text-center" data-testid="cat">Categories</h4>
                        <Row>

                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th><Badge variant="secondary">New</Badge><a style={{textDecoration:'none',color:'#222831'}} href="https://covid19indian-state.netlify.app/" rel="noopener noreferrer" target="_blank">Covid<br />
                                        </a></th>
                                        <th className='category-name' ><Link style={{textDecoration:'none',color:'#222831'}} to="/category/Sports">Sports</Link></th>
                                        <th className='category-name' ><Link style={{textDecoration:'none',color:'#222831'}} to="/category/Politics">Politics</Link></th>
                                        <th className='category-name' ><Link style={{textDecoration:'none',color:'#222831'}} to="/category/Technology">Technology</Link></th>
                                        <th className='category-name' ><Link style={{textDecoration:'none',color:'#222831'}} to="/category/Entertainment">Entertainment</Link></th>
                                        <th className='category-name' ><Link style={{textDecoration:'none',color:'#222831'}} to="/category/International">International</Link></th>
                                        <th className='category-name' ><Link style={{textDecoration:'none',color:'#222831'}} to="/category/Others">Others</Link></th>



                                    </tr>
                                </thead>

                            </Table>
                        </Row>
                    </div>
                    <h4 className="text-center">Recent Stories</h4>
                    <Row>

                        {oldposts.map((item, i) => {
                            return (
                                <Col key={i} sm={12} md={6} lg={4} xl={4}>
                                    <Link to={"/post/" + item._id} style={{ textDecoration: 'none', color: 'black' }}>
                                        <Article item={item} />
                                    </Link>

                                    <br />
                                </Col>


                            )
                        })}


                    </Row>
                    <div className="container">

                        <Pagination>{pagination}</Pagination>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
                    }
}




export default HomeScreen;
