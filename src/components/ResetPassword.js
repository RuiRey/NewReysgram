import React from 'react';
import Header from './Header';
import firebase from 'firebase';

class ResetPassword extends React.Component{
    render(){
        const auth = firebase.auth();
        const resetPassword = (event)=>{
            event.preventDefault();
            let emailAddress = this.refs.email.value;
            auth.sendPasswordResetEmail(emailAddress).then(function() {
                // Email sent.
                alert('Thanks, Please check '+emailAddress+' for a link to reset your password.')
              }).catch(function(error) {
                // An error happened.
                alert(error);
              });
        }
        return(
            <React.Fragment>
                 <Header/>
                 <div className="jumbotron jumbotron__full-page">
                  <div className="jumbotron__first-row">
                    <h1 className="heading-primary">
                      <span className="heading-primary--sub">Reset Password</span>
                      <span className="heading-primary--third">We can help you reset your password using your email address.</span>
                    </h1>              
                    
                     <form className="form">
                       <div className="form__group">
                       <input
                                type="email" 
                                ref="email"
                                className="form__input" 
                                id="email" 
                                placeholder="Email Address" 
                                required 
                            />
                         <label htmlFor="email" className="form__label">Email Address</label>
                       </div>

                       <div className="form__group">
                          <button
                                onClick={resetPassword}
                                type="submit" 
                                className="btn"
                            >Reset My Password</button>
                        </div>
                     </form>
                 </div>
                 </div>              
            </React.Fragment>
        );
    }
}


export default ResetPassword;