//increment
//this 'index' will tell us which post is going to add likes
// export function increment(index) {
//     return{
//         type:"INCREMENT_LIKES",
//         index:index
//     }
// }

// //add comment
// export function addComent(postId, author, comment){
//     return{
//         type:"ADD_COMMENT",
//         postId: postId,
//         author: author,
//         comment: comment
//     }
// }

//remove comment
export function removeComment(commentId, i){
    return{
        type:"REMOVE_COMMENT",
        commentId,
        i
    }
}//same as the upper function, ES6 new design

export function replyComment(commentId, user, comment){
    return{
        type:"REPLY_COMMENT",
        commentId,
        user,
        comment
    }
}
