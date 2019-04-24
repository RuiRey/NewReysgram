import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase';
import Header from './Header';

class EditProfile extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            username: props.profile.username,
            phoneNumber: props.profile.phoneNumber,
            gender: props.profile.gender
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            username: props.profile.username,
            phoneNumber: props.profile.phoneNumber || "",
            gender: props.profile.gender || ""
        });
    }
    
    
    render(){
        const {firebase, auth, profile}=this.props;
   
        const handleChange = (e)=>{
            this.setState({[e.target.name]: e.target.value});
        }

        const handleEditProfile=(e)=>{
            e.preventDefault();
           if(this.state.username === profile.username) {
                firebase.updateProfile({
                    username: this.state.username,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender
                });
            }else if (Object.keys(this.props.usernames).includes(this.state.username)) {
                alert("This Username is already taken. Please use another Username!");
            } else {
                firebase.remove(`/usernames/${profile.username}/`);
                firebase.set(`/usernames/${this.state.username}/`, auth.uid);
                firebase.updateProfile({
                    username: this.state.username,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender
                });
                
            }
            
        }
        
        return(
            <React.Fragment>
            <Header/>
            <div className="jumbotron jumbotron__full-page">
                <div className="jumbotron__first-row">
                    <h1 className="heading-primary">
                        <span className="heading-primary--sub">Your Profile</span>
                        <span className="heading-primary--third">Email: {profile.email}</span>
                        <span className="heading-primary--third">Username: {profile.username}</span>
                        {!!profile.phoneNumber && (
                            <span className="heading-primary--third">Phone Number: {profile.phoneNumber}</span>
                        )}
                        {!!profile.gender && (
                            <span className="heading-primary--third">Gender: {profile.gender}</span>
                        )}
                        <a className="btn" href={`/home/${auth.uid}`} role="button">Go Back to Your Home Page</a>
                    
                        <span className="heading-primary--sub margin__top">Edit Your Profile</span>
                    </h1>

                    <form className="form form__simple">
                        <div className="form__group">
                            <input onChange={handleChange} value={this.state.username} type="text" name="username" className="form__input form__input-simple" id="Username" />
                            <label htmlFor="Username" className="form__label">New Username</label>
                        </div>

                        <div className="form__group">
                            <input onChange={handleChange} value={this.state.phoneNumber || ''} type="number" name="phoneNumber" className="form__input form__input-simple" id="phoneNumber" />
                            <label htmlFor="phoneNumber" className="form__label">Phone Number</label>
                        </div>

                        <div className="form__group">
                            <select onChange={handleChange} value={this.state.gender || ''} name="gender" className="form__input form__input-simple" id="gender">
                                <option></option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Secret</option>
                            </select>
                            <label htmlFor="gender" className="form__label">Gender</label>
                        </div>

                        <div className="form__group">
                            <input onClick={handleEditProfile} type="submit" className="btn" value="Updage Profile"/>
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
  )(EditProfile);