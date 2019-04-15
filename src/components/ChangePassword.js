import React from 'react';
import Header from './Header';
import firebase from 'firebase';


const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
  });
  
  const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class ChangePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }
    
      onSubmit = (event) => {
        const { passwordOne } = this.state;
        firebase.auth().currentUser.updatePassword(passwordOne)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });
        event.preventDefault();
      }
    render(){
        const {
            passwordOne,
            passwordTwo,
            error,
          } = this.state;
          const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';
        
        return(
            <React.Fragment>
            <Header/>
            <div className="container">
                <div className="forminmyweb">
                    <h3>Change Your Password</h3>
                    <form className="form-horizontal" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="newpassword" className="col-sm-2 control-label">New Password</label>
                            <div className="col-sm-10">
                                <input
                                    value={passwordOne}
                                    onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                                    type="password"
                                    placeholder="New Password"
                                    className="form-control"
                                    id="newpassword"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmpassword" className="col-sm-2 control-label">Confirm New Password</label>
                            <div className="col-sm-10">
                                <input
                                    value={passwordTwo}
                                    onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className="form-control"
                                    id="confirmpassword"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                              <button disabled={isInvalid} type="submit" className="btn btn-danger btn-lg btn-block">Reset My Password</button>
                            </div>
                        </div>

                        { error && <p>{error.message}</p> }
                    </form>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default ChangePassword;