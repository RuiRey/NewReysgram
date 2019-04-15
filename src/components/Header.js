import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import rw from './rw.png';


class Header extends Component {
  render() {
  const logOut =(e)=>{
      this.props.firebase.logout();
      alert("You've successfully logged out!");
  }
  const renderLogin = ()=>{
          if(this.props.auth.uid){
              return(
                <React.Fragment>
                  <li><a href={`/home/${this.props.auth.uid}`}>Welcome: {this.props.profile.username} <span className="glyphicon glyphicon-user" aria-hidden="true"></span></a></li>
                   
                   <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Your Profile <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><a href={`/editprofile/${this.props.auth.uid}`}>Edit Your Profile</a></li>
                          <li><a href={`/changepassword/${this.props.auth.uid}`}>Change Password</a></li>
                        </ul>
                      </li>

                  <li><a href="/" onClick={logOut}>Log Out <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span></a></li>
                </React.Fragment>
              );
          }else{
              return(
                <React.Fragment>
                      {/* <a href="/login">LogIn</a>&nbsp; <span>or</span> &nbsp;
                      <a href="/signup">Sign Up</a> */}
                      <li><a href="/signup">Sign Up <i className="fa fa-user-plus" aria-hidden="true"></i></a></li>
					            <li><a href="/login">Login <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span></a></li>
                </React.Fragment>
              );
          }
      }

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
	    	<div className="container">
	    		<div className="navbar-header">
	    			 <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-nav-demo" aria-expanded="false">
	            <span className="sr-only">Toggle navigation</span>
	            <span className="icon-bar"></span>
	            <span className="icon-bar"></span>
	            <span className="icon-bar"></span>
	          </button>
            {/* <img src={rw} className="App-logo" alt="logo" /> */}
	    			<a href={"/"} className="navbar-brand"><img src={rw} className="App-logo" alt="logo" /> Reysgram</a>
	    		</div>
	    		<div className="collapse navbar-collapse" id="bs-nav-demo">
            <ul class="nav navbar-nav">
				    	<li><a href="/">Home</a></li>
				    	<li><a href="/contact">Contact</a></li>
				    </ul> 
	    			<ul className="nav navbar-nav navbar-right">
              {renderLogin()}
	    			</ul>
	    		</div>
	    	</div>
	    </nav>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state) => ({
      auth: state.firebase.auth,
      profile: state.firebase.profile,
  }))
)(Header)