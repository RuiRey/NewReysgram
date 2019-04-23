import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import Header from './Header';

class Login extends React.Component{
    render(){
        const { auth,history } = this.props;

        const checkLogin = ()=>{
            if(auth.uid){
                history.push(`/home/${auth.uid}`);
            }
        }
        checkLogin();
        const logIn = (e)=>{
            e.preventDefault();
            this.props.firebase.login({
                email: this.refs.email.value,
                password: this.refs.password.value,
              }).catch(err =>{
                  alert(err);
                  this.refs.email.value="";
                  this.refs.password.value="";
              });
        }
        return(
            <React.Fragment>
                <Header/>
                <div className="jumbotron jumbotron__full-page">
                  <div className="jumbotron__first-row">
                    <h1 className="heading-primary">
                      <span className="heading-primary--sub">LogIn Please</span>
                      <span className="heading-primary--sub">or</span>
                      <a href='/resetpassword' className="heading-primary--link">Forgot Password?</a>
                    </h1>
                    
                    
                    <form className="form">

                      <div className="form__group">
                        <input type="email" ref="email" className="form__input" id="loginEmail" placeholder="Email Address" required/>
                        <label htmlFor="loginEmail" className="form__label">Email Address</label>
                      </div>

                      <div className="form__group">
                        <input type="password" ref="password" className="form__input" id="loginPassword" placeholder="Password" required/>
                        <label htmlFor="loginPassword" className="form__label">Password</label>
                      </div>
                        
                      <div className="form__group">
                        <button onClick={logIn} type="submit" className="btn">Login</button>
                      </div>
                    </form>
                </div>
                </div>
                
            </React.Fragment>
        );
    }
}
export default compose(
    firebaseConnect(),
    connect((state) => ({
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }))
  )(Login)