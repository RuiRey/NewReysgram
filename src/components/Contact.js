import React from 'react';
import Header from './Header';

class Contact extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Header/>
                <div>
			        <h2><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Feel free to contact me!</h2>
			        <h3>wangrui1207@gmail.com</h3>
		        </div>
            </React.Fragment>
        );    
    }
}

export default Contact;