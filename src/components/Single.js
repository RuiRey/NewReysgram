import React from 'react';
import Header from './Header';
import Photo from './Photo';
import Comments from './Comments';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty,getVal } from 'react-redux-firebase'

const Single =({posts, firebase,match, auth, profile, history, comments, replyComment}) => {
    const postId = match.params.postId;
    const authorUid = match.params.authorUid;
    const singlePhoto = !isLoaded(posts)
        ? 'Loading'
        : isEmpty(posts)
            ? 'Posts list is empty'
            : Object.keys(posts[authorUid]).map(
                // eslint-disable-next-line
                (post, index)=>{
                        if(post === postId){
                            return( 
                                    <React.Fragment key={index}>
                                        <Photo match={match} index={index} post={posts[authorUid][post]} postId={post} />
                                        <Comments 
                                            post={posts[authorUid][post]} 
                                            postId={post}
                                        />
                                    </React.Fragment>
                            );
                        }
                    }
                )
    return(
        <React.Fragment>
            <Header />
            <div className="container">

                <div className="photos">
                    <div className="photo">
                        { singlePhoto }
                    </div>
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
       ]
       
    ),
    connect((state) => ({
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        posts: getVal(state.firebase, `data/posts`),
    }))
  )(Single);
//export default Single;