import React from 'react';
import Header from './Header';
import Photo from './Photo';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const PhotoGrid = ({ history,auth, posts, firebase, match, profile }) =>{
    
    const postsList = !isLoaded(posts)
    ? 'Loading'
    : isEmpty(posts)
        ? 'Come on, join Reysgram and upload beautiful photos'
        : Object.keys(posts).map((uid)=>{
            return(Object.keys(posts[uid]).map((post)=>{
                return(
                    <div className="col-lg-4 col-sm-6">
                        <div className="thumbnail">
                            <Photo post={posts[uid][post]} postId={post} />
                        </div>
                    </div>
                );
            }))
        })
    
    const renderJumbotron = ()=>{
        if(!auth.uid){
            return(
                <div className="jumbotron">
			        <h1><i className="fa fa-camera-retro" aria-hidden="true"></i> Join Reysgram</h1>
			        <h2>Upload Your Beautiful Photos</h2>
                    <h4>
                        <a href="/signup">Sign Up</a> &nbsp;or &nbsp;
                        <a href="/login">Login</a>
                    </h4>
		        </div>
            );
        }
    }
    
    return(
        <React.Fragment>
            <Header />
            {renderJumbotron()}
            <div className="container">
                <div className="row display-flex">
                    {postsList}
                </div>
             </div>
             
        </React.Fragment>
    )
}

export default compose(
    firebaseConnect((props)=>
        [
           {path: 'users/'},
           {path: 'users/'},
           {path: `posts/`},
       ]
    ),
    connect((state) => ({
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        posts: state.firebase.data.posts,
    }))
  )(PhotoGrid);