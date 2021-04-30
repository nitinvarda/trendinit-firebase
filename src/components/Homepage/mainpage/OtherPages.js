import React, { useState } from 'react';

import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Article from '../../Article'

import Loader from '../../Loader'


const OtherPages = (props) => {
    const isLoading = false
    const pages =1;
    const articles = []



    const pageNumber = props.match.params.pageNumber


   
    useState(() => {
      
    }, [pageNumber])


    let pagination = []
    for (let number = 1; number <= pages; number++) {

        pagination.push(
            <Pagination.Item key={number} active={number === Number(pageNumber)} href={number === 1 ? '/' : '/page/' + number} >
                {number}

            </Pagination.Item>
        );
    }
    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <Container>
                <Row>
                   
                    {articles.map((item, i) => {
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
                <Pagination>{pagination}</Pagination>
            </Container>
        );
    }
}


export default OtherPages;
