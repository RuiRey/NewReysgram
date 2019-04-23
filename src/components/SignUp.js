import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import Header from './Header';

class SignUp extends React.Component{
    render(){
        const signUp = (e)=>{
            e.preventDefault();
            if (this.props.usernames && Object.keys(this.props.usernames).includes(this.refs.userName.value)) {
              alert("This Username is already taken. Please use another Username!");
              this.refs.userName.value="";
            }else{
              const createNewUser = ({ email, password, username }) => {
                this.props.firebase.createUser(
                  { email, password },
                  { username, email }
                ).catch((err) => {
                    alert(err);
                    this.refs.email.value="";
                    this.refs.password.value="";
                    this.refs.userName.value="";
                });
              }
            createNewUser({
                email: this.refs.email.value,
                password: this.refs.password.value,
                username: this.refs.userName.value,
              }); 
            }  
        }
        const checkLogin = ()=>{
          if(this.props.auth.uid){
            this.props.firebase.set(`/usernames/${this.refs.userName.value}`, this.props.auth.uid);
              this.props.history.push(`/home/${this.props.auth.uid}`);
          }
      }
      checkLogin();

        return(
            <React.Fragment>
                <Header/>
                <div className="jumbotron jumbotron__full-page">
                  <div className="jumbotron__first-row">
                    <h1 className="heading-primary">
                      <span className="heading-primary--sub">Welcome to join Reysgram</span>
                      <span className="heading-primary--third">Set up your Username and Password</span>
                    </h1>
                    
                    <form className="form">
                      <div className="form__group">
                        <input type="email" ref="email" className="form__input" id="signupEmail" placeholder="Email Address" required/>
                        <label htmlFor="signupEmail" className="form__label">Email Address</label>
                      </div>

                      <div className="form__group">
                        <input type="text" ref="userName" className="form__input" id="signupUserName" placeholder="Username" required/>
                        <label htmlFor="signupUserName" className="form__label">Username</label>
                      </div>

                      <div className="form__group">
                        <input type="password" ref="password" className="form__input" id="signupPassword" placeholder="Password" required/>
                        <label htmlFor="signupPassword" className="form__label">Password</label>
                      </div>
                        
                      <div className="form__group">
                        <button onClick={signUp} type="submit" className="btn">Sign Up</button>
                      </div>
                    </form>
                  </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default compose(
  firebaseConnect((props)=>
    [
      {path: 'users/'},
      {path: 'users/'},
      {path: `usernames/`},
    ]
  ),
  connect((state) => ({
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      usernames: state.firebase.data.usernames,
  }))
)(SignUp);