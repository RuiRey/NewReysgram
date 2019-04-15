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
            <div className="container">
                <div className="jumbotron">
                    <h2 className="title">Your Profile</h2>
                    <h3>Email: {profile.email}</h3>
                    <h3>Username: {profile.username}</h3>
                    {!!profile.phoneNumber && (
                        <h3>Phone Number: {profile.phoneNumber}</h3>
                    )}
                    {!!profile.gender && (
                        <h3>Gender: {profile.gender}</h3>
                    )}
                    <p><a className="btn btn-danger btn-lg gohomebtn" href={`/home/${auth.uid}`} role="button">Go Back to Your Home Page</a></p>
                </div>
                <hr/>
                <div className="forminmyweb">
                    <h3 className="title">Edit Your Profile</h3>
                    <form className="form-horizontal">

                        <div className="form-group">
                            <label htmlFor="Username" className="col-sm-2 control-label">New Username</label>
                            <div className="col-sm-10">
                            <input onChange={handleChange} value={this.state.username} type="text" name="username" className="form-control" id="Username" />
                            </div>
                        </div>

                        <div className="form-group"> 
                            <label htmlFor="phoneNumber" className="col-sm-2 control-label">Phone Number</label>
                            <div className="col-sm-10">
                            <input onChange={handleChange} value={this.state.phoneNumber || ''} type="number" name="phoneNumber" className="form-control" id="phoneNumber" />
                            </div>
                        </div>

                        <div className="form-group">
                        <label htmlFor="gender" className="col-sm-2 control-label">Gender</label>
                        <div className="col-sm-10">
                          <select onChange={handleChange} value={this.state.gender || ''} name="gender" className="form-control" id="gender">
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Secret</option>
                          </select>
                        </div>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <input onClick={handleEditProfile} type="submit" className="btn btn-danger btn-lg btn-block"/>
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