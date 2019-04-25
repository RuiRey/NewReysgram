import React from 'react';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
//import SingleComment from './SingleComment';
import App from './App';

class Comments extends React.Component{    
  renderInputComment=()=>{
    if(this.props.auth.uid){
      return(
        <form ref="commentForm" className="comments__form" onSubmit={this.handleSubmit}>
          <input type="text" ref="comment" className="comments__input" placeholder="Add Comment" />
        <input type="submit" hidden />
      </form>
      );
    }
  }

handleSubmit= (e) => {
        e.preventDefault();
        let newComment ={
          text:this.refs.comment.value,
          user:this.props.profile.username,
          userId: this.props.auth.uid
        }
        this.props.firebase.set(`/posts/${this.props.post.authorUid}/${this.props.postId}/comments/${Date.now()}`, newComment);
        this.refs.comment.value="";
};
  
  render() {
    const { post, postId } = this.props;
    const commentList = post.comments ? Object.keys(post.comments).map((comment, i)=>{
      return(
        <App comment={comment} key={i} post={post} postId={postId}/>
      );
    }) : null;

    return (
      <div className="comments">
        {commentList}
        {this.renderInputComment()}
      </div>
    )
  }
};

export default compose(
  firebaseConnect(),
  connect((state) => ({
      auth: state.firebase.auth,
      profile: state.firebase.profile,
  }))
)(Comments)