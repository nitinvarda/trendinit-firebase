import React from 'react';


// this is a simple contact us component which is stateless functional component
const Footer = () => {
    return (

        <footer className="page-footer font-small blue" style={{ backgroundColor: "#343a40" }}>


            <div className="footer-copyright text-center py-3" style={{ color: "white" }}>
                <a href="https://express-react-trendinit.herokuapp.com/" style={{textDecoration:'none',color:'White'}}> Trendinit</a>
            </div>


        </footer>

    );
}

export default Footer;
