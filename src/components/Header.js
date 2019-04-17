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
                  {/* <a href={`/home/${this.props.auth.uid}`} className="header__link">Your Photos - {this.props.profile.username}</a>
                   
                   <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Your Profile <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><a href={`/editprofile/${this.props.auth.uid}`}>Edit Your Profile</a></li>
                          <li><a href={`/changepassword/${this.props.auth.uid}`}>Change Password</a></li>
                      </ul>
                    </li> */}

                    <div className="dropdown">
                      <button className="dropbtn">Your Account</button>
                      <div className="dropdown-content">
                        <a href={`/home/${this.props.auth.uid}`}>Your Photos</a>
                        <a href={`/editprofile/${this.props.auth.uid}`}>Edit Your Profile</a>
                        <a href={`/changepassword/${this.props.auth.uid}`}>Change Password</a>
                      </div>
                    </div>

                  <a href="/" onClick={logOut} className="header__link">Log Out: {this.props.profile.username}</a>
                </React.Fragment>
              );
          }else{
              return(
                <React.Fragment>
                      {/* <a href="/login">LogIn</a>&nbsp; <span>or</span> &nbsp;
                      <a href="/signup">Sign Up</a> */}
					            <a href="/login" className="header__link">LogIn</a>
                      <a href="/signup" className="header__link" id="joinfree">Join free</a>
                </React.Fragment>
              );
          }
      }

    return (
      <nav className="header">
        <a href={"/"} className="header__logo-box header__link">
          <img src={rw} className="header__logo-img" alt="logo"/>
          <div className="header__logo-text">Reysgram</div>
        </a>
        <a href="/" className="header__home header__link">Home</a>
        <a href="/contact" className="header__contact header__link">Contact</a>
        {renderLogin()}
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