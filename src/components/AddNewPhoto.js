import React from 'react';
import { withFirebase } from 'react-redux-firebase';


class AddNewPhoto extends React.Component{
    
    render(){
        const { auth, profile } = this.props;
        
        const pushNewPhoto = (e)=>{
            e.preventDefault();
            let newPhoto = {
                id:`${Date.now()}`,
                caption: this.refs.caption.value,
                display_src: this.refs.url.value,
                author: profile.username, 
                authorUid: auth.uid
            }
            this.props.firebase.set(`/posts/${auth.uid}/${newPhoto.id}`, newPhoto);
            this.refs.caption.value='';
            this.refs.url.value='';
        }
        
        return(
             <div className="container">
             <div className="forminmyweb">
                <h3>Add New Photo</h3>
                <form ref="photoForm" className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="Caption" className="col-sm-2 control-label">Caption</label>
                    <div className="col-sm-10">
                      <input type="text" ref="caption" className="form-control" id="Caption" placeholder="Caption" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="photoUrl" className="col-sm-2 control-label">Photo URL</label>
                    <div className="col-sm-10">
                      <input type="text" ref="url" className="form-control" id="photoUrl" placeholder="Photo URL" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button onClick={pushNewPhoto} type="submit" className="btn btn-danger btn-lg btn-block">Submit</button>
                    </div>
                  </div>
                </form>
             </div>
                
            </div>
        )
    }
}

export default withFirebase(AddNewPhoto);