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
                 <div className="container">
                 <div className="resetpasswordform">
                     <h3>Reset Password</h3>
                     <p>We can help you reset your password using your email address.</p>
                     <form className="form-horizontal">
                       <div className="form-group">
                         <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                         <div className="col-sm-10">
                           <input
                                type="email" 
                                ref="email"
                                className="form-control" 
                                id="email" 
                                placeholder="Email Address" 
                            />
                         </div>
                       </div>                      
                       <div className="form-group">
                         <div className="col-sm-offset-2 col-sm-10">
                           <button
                                onClick={resetPassword}
                                type="submit" 
                                className="btn btn-danger btn-lg btn-block"
                            >Reset My Password</button>
                         </div>
                       </div>
                     </form>
                 </div>
                 </div>              
            </React.Fragment>
        );
    }
}


export default ResetPassword;