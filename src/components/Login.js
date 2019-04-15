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
                <div className="container">
                <div className="forminmyweb">
                    <h3>Login Please</h3>
                    <p>or</p> 
                    <a href='/resetpassword' className="resetpassword">Forgot Password?</a>
                    <hr/>
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label htmlFor="loginEmail" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                          <input type="email" ref="email" className="form-control" id="loginEmail" placeholder="Email" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginPassword" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                          <input type="password" ref="password" className="form-control" id="loginPassword" placeholder="Password" />
                        </div>
                      </div>
                        
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button onClick={logIn} type="submit" className="btn btn-danger btn-lg btn-block">Login</button>
                        </div>
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