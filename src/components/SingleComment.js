import React from 'react';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

class SingleComment extends React.Component{
  state = {
    inputShow: false,
  }

  renderDelectButton=(comment, userId )=>{
    if((this.props.auth.uid) && (this.props.auth.uid === this.props.post.authorUid || this.props.auth.uid === userId )){
      return(
        <button onClick={()=>this.props.firebase.remove(`/posts/${this.props.post.authorUid}/${this.props.postId}/comments/${comment}`)} className="remove-comment">&times;</button>
      );
    }
  }

renderReplyComment=()=>{
  if(this.props.auth.uid){
    return(
      <React.Fragment>
      <button
        onClick={()=>{
          this.setState({inputShow: !this.state.inputShow});
          }}
        className="remove-comment"
      >&crarr;</button>
      </React.Fragment>
    );
  }
}

handleInputArea=(comment)=>{
  if(this.state.inputShow){
      return(
        <form ref="replyCommentForm" className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-10">
              <input type="text" ref="comment" className="form-control replyform" placeholder="Add Replay" />
            </div>
          </div>
          <input type="submit" hidden />
        </form>
    );
  }
}

handleSubmit=(e)=>{
    e.preventDefault();
    const commentId = this.props.comment;
    const user = this.props.profile.username;
    const comment = this.refs.comment.value;
    this.props.replyComment(commentId, user, comment);
    this.refs.replyCommentForm.reset();
    this.setState({inputShow: !this.state.inputShow});
}

renderComment=(singleReply, i)=>{
    const {post, comment} = this.props; 
    return (
        <div className="comment" key={i}>
          <p className="replycomment">
            <strong>{singleReply.user}</strong> reply <strong>{post.comments[comment].user}</strong>
            : {singleReply.text}
            <button className="remove-comment" onClick={()=>this.handleDelete(i)}>&times;</button>
          </p>
        </div>
      )
}

handleDelete=(i)=>{
  const commentId = this.props.comment;
  this.props.removeComment(commentId,i)
}
  
  render() {
    const { post, comment, comments } = this.props;
    const commentList = comments[comment] ? comments[comment].map((singleReply, i)=>
        this.renderComment(singleReply, i)
    ) : null;
    return (
          <div className="comment">
            <p>
              <strong>{post.comments[comment].user}</strong>
              {post.comments[comment].text}
              {this.handleInputArea()}
              {this.renderReplyComment()}
              {this.renderDelectButton(comment, post.comments[comment].userId)}
              {commentList}
            </p>
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
)(SingleComment)