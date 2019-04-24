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
            <div className="jumbotron jumbotron__full-page">
                <div className="jumbotron__first-row">
                  <h1 className="heading-primary">
                    <span className="heading-primary--sub">Change your password</span>
                  </h1>
                  
                  <form className="form" onSubmit={this.onSubmit}>
                    <div className="form__group">
                      <input
                        value={passwordOne}
                        onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                        type="password"
                        placeholder="New Password"
                        className="form__input"
                        id="newpassword"
                      />
                      <label htmlFor="newpassword" className="form__label">New Password</label>
                    </div>

                    <div className="form__group">
                      <input
                        value={passwordTwo}
                        onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                        type="password"
                        placeholder="Confirm New Password"
                        className="form__input"
                        id="confirmpassword"
                      />
                      <label htmlFor="confirmpassword" className="form__label">Confirm New Password</label>
                    </div>

                    <div className="form-group">
                      <button disabled={isInvalid} type="submit" className={"btn " + (isInvalid ? 'btn__not-allowed' : '')}>Reset My Password</button>
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