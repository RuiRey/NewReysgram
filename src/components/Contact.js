import React from 'react';
import Header from './Header';
import plane from '../img/icons-plane.png';

class Contact extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Header/>
                <div className="jumbotron jumbotron__full-page">
                    <div className="jumbotron__heading-box">
                    <h1 className="heading-primary">
                        <img src={plane} alt=""/>
                        <span className="heading-primary--sub">Feel free to contact me!</span>
                        <span className="heading-primary--third">Email: wangrui1207@gmail.com</span>
                        <a className="heading-primary--link" href="https://github.com/RuiRey">Links: https://github.com/RuiRey</a>
                    </h1>
                    </div>
			    </div>
            </React.Fragment>
        );    
    }
}

export default Contact;