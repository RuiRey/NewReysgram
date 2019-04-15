import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'


class Photo extends React.Component{
    render(){
        const {postId,firebase,post, auth, profile} = this.props;
        const owner = post.authorUid === auth.uid;
        const commentL = post.comments ? Object.keys(post.comments).length : 0;
        let likeCount = post.likes ? Object.keys(post.likes).length : 0
        const renderDeleteButton = ()=>{
            if(owner){
                return(
                    <button className="threebtn btn btn-warning" onClick={()=>firebase.remove(`/posts/${post.authorUid}/${postId}`)} >Delete-Post</button>
                )
            }
        }

        const likePhoto = (e)=>{
            e.preventDefault();
            if(post.likes && post.likes[auth.uid]){
                firebase.remove(`/posts/${post.authorUid}/${postId}/likes/${auth.uid}`);
            }else{
                firebase.set(`/posts/${post.authorUid}/${postId}/likes/${auth.uid}`, profile.username);
            }
        }

        const renderLikeButton = ()=>{
            if(auth.uid){
                return(
                    <button onClick={likePhoto} className=" threebtn btn btn-danger" >
                        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {likeCount}
                    </button>
                );
            }else{
                return(
                    <button disabled="disabled" className=" threebtn btn btn-danger" >
                        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {likeCount}
                    </button>
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
                <a href={`/view/${post.authorUid}/${postId}`} >
                    <img className="img-rounded" src={post.display_src} alt={post.caption}/>
                </a>
                <div className="caption">
                    <a href={`/home/${post.authorUid}`} className="author">
                        Author: {post.author}
                    </a>
                    <p>
                        {likeList}
                    </p> 
                    <h3>{post.caption}</h3>
                    <p>
                        {renderLikeButton()} 
                        <a href={`/view/${post.authorUid}/${postId}`} className="threebtn btn btn-primary" role="button">
                            Comments:{' '}{commentL}
                        </a>
                        {renderDeleteButton()}
                    </p>                    
                </div>
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