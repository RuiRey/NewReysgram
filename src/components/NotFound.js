import React from 'react';
import Header from './Header';

const NotFound = () => (
    <React.Fragment>
        <Header/>
        <div className="jumbotron">
	        <h2>Oops, Not Found!</h2>
	    </div>
    </React.Fragment>
	);

export default NotFound;