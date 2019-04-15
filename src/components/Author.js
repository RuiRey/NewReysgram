import React from 'react';
import Header from './Header';
import Photo from './Photo';
import AddNewPhoto from './AddNewPhoto';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const Author = ({ firebase, posts, auth, profile, history, match, autherProfile }) =>{
    const photoList = !isLoaded(posts)
    ? 'Loading'
    :isEmpty(posts)
        ? 'Photo list is empty, Add New Photo please.'
        : isEmpty(posts[match.params.userId])
            ? 'Photo list is empty, Add New Photo please.'
            : Object.keys(posts[match.params.userId]).map((post, index)=>{
            return(
                <div className="col-lg-4 col-sm-6">
                    <div className="thumbnail">
                        <Photo key={index} post={posts[match.params.userId][post]} postId={post} />
                    </div>
                </div>
            );
        }
    )

    const renderAddNewPhoto=()=>{
        if(auth.uid && auth.uid === match.params.userId){
            return(
                <React.Fragment>
                    <AddNewPhoto auth={auth} profile={profile} />
                    <hr/>
                </React.Fragment>
            );
        }
    }

    const authorName = !isLoaded(autherProfile)
        ? ''
        :isEmpty(autherProfile)
            ? ''
            : isEmpty(autherProfile[match.params.userId])
                ? ''
                : autherProfile[match.params.userId].username
    
    const renderJumbotron = ()=>{
        if(!auth.uid){
            return(
                <div className="jumbotron">
		            <h2><i className="fa fa-camera-retro" aria-hidden="true"></i> {authorName}</h2>
		            <h4>Beautiful high-quality photos created by {authorName}.</h4>
                    <hr/>
		        </div>
            );
        }else if(auth.uid !== match.params.userId){
            return(
                <div className="jumbotron">
		            <h2><i className="fa fa-camera-retro" aria-hidden="true"></i> {authorName}</h2>
		            <h4>Beautiful high-quality photos created by {authorName}.</h4>
                    <hr/>
		        </div>
            );
        }
    }

    return(
        <React.Fragment>
        <Header/>
        {renderJumbotron()}
        <div className="container">
            {renderAddNewPhoto()}
            <div className="row">
                {photoList}
            </div>
        </div>
    </React.Fragment>
    );
}


export default compose(
    firebaseConnect((props)=>
        [
           {path: 'users/'},
           {path: 'users/'},
           {path: `posts/`},
           {path: `users/`}
       ]
       
    ),
    connect((state) => ({
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        posts: state.firebase.data.posts,
        autherProfile: state.firebase.data.users
    }))
  )(Author);
  