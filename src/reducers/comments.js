function postComments(state = [], action) {
    switch(action.type){
      
      case 'REMOVE_COMMENT':
        // we need to return the new state without the deleted comment
        return [
          // from the start to the one we want to delete
          ...state.slice(0,action.i),
          // after the deleted one, to the end
          ...state.slice(action.i + 1)
        ]
        case 'REPLY_COMMENT':
            return [
                ...state,{
                    user: action.user,
                    text: action.comment
                  }
                ];
      default:
        return state;
    }
  }
  
  function comments(state = [], action) {
    if(typeof action.commentId !== 'undefined') {
      return {
        // take the current state
        ...state,
        // overwrite this post with a new one
        [action.commentId] : postComments(state[action.commentId], action)
      }
    }
    return state;
  }
  
  export default comments;