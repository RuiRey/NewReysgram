import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import heart from '../img/icons8-love-16.png';


class Photo extends React.Component{
    render(){
        const {postId,firebase,post, auth, profile} = this.props;
        const owner = post.authorUid === auth.uid;
        const commentL = post.comments ? Object.keys(post.comments).length : 0;
        let likeCount = post.likes ? Object.keys(post.likes).length : 0
        const renderDeleteButton = ()=>{
            if(owner){
                return(
                    <div className="photo__delete" onClick={()=>firebase.remove(`/posts/${post.authorUid}/${postId}`)}>
                        Delete-Post
                    </div>
                    //<button className="threebtn btn btn-warning" onClick={()=>firebase.remove(`/posts/${post.authorUid}/${postId}`)} >Delete-Post</button>
                )
            }
        }

        const likePhoto = (e)=>{
            //e.preventDefault();
            if(post.likes && post.likes[auth.uid]){
                firebase.remove(`/posts/${post.authorUid}/${postId}/likes/${auth.uid}`);
            }else{
                firebase.set(`/posts/${post.authorUid}/${postId}/likes/${auth.uid}`, profile.username);
            }
        }

        const loginPlease =(e)=>{
            alert("LogIn to Like this Pohto!");
        }

        const renderLikeButton = ()=>{
            if(auth.uid){
                return(
                    <div className="photo__like" onClick={likePhoto}>
                        <img src={heart} className="photo__like-heart" alt="Like"/> {likeCount}
                    </div>
                );
            }else{
                return(
                    <div className="photo__like" onClick={loginPlease}>
                        <img src={heart} className="photo__like-heart" alt="Like"/> {likeCount}
                    </div>
                );
            }
        }

        const renderLikeList = (uid, i)=>{
            if(this.props.match && this.props.match.path === "/view/:authorUid/:postId"){
                if(i < likeCount-2){
                    return(
                        <span>
                            <a href={`/home/${uid}`}>
                                {post.likes[uid]}
                            </a>
                        , </span>
                    );
                }else if(i === likeCount-2){
                    return(
                            <a href={`/home/${uid}`} >
                                {post.likes[uid]}
                            </a>
                    );
                }else if(likeCount===1){
                    return(
                        <React.Fragment>
                            <a href={`/home/${uid}`} >
                                {post.likes[uid]}
                            </a>
                            <span> like this </span>
                        </React.Fragment>
                    );
                }else {
                    return(
                        <React.Fragment>
                        <span> and </span>
                            <a href={`/home/${uid}`} >
                                {post.likes[uid]}
                            </a>
                            <span> like this </span>
                        </React.Fragment>
                    );
                }
            } 
        }

        const likeList = post.likes ? Object.keys(post.likes).map((uid, i)=>renderLikeList(uid, i)) : null;
        
        return(
            <React.Fragment>
                <a className="photo__link" href={`/view/${post.authorUid}/${postId}`} >
                    <img className="photo__link-img" src={post.display_src} alt={post.caption}/>
                </a>
                
                <a href={`/home/${post.authorUid}`} className="photo__author">
                    Author: {post.author}
                </a>

                <p>
                    {likeList}
                </p> 

                <h3 className="photo__caption">{post.caption}</h3>

                {renderLikeButton()} 
                    
                <a href={`/view/${post.authorUid}/${postId}`} className="photo__comments">
                    Comments:{' '}{commentL}
                </a>
        
                {renderDeleteButton()}                  
            </React.Fragment>
        );
    }
}

export default compose(
    firebaseConnect(),
    connect((state) => ({
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }))
  )(Photo)