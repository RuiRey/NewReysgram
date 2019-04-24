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
             <div className="jumbotron">
              <div className="jumbotron__heading-box">
                <h1 className="heading-primary">
                  <span className="heading-primary--sub">Add New Photo</span>
                </h1>
                
                <form ref="photoForm" className="form form__simple">
                  <div className="form__group">
                    <input type="text" ref="caption" className="form__input form__input-simple" id="Caption" placeholder="Caption" required/>
                    <label htmlFor="Caption" className="form__label">Caption</label>
                  </div>

                  <div className="form__group">
                    <input type="text" ref="url" className="form__input form__input-simple" id="photoUrl" placeholder="Photo URL" required/>
                    <label htmlFor="photoUrl" className="form__label">Photo URL</label>
                  </div>
                  
                  <div className="form__group">
                    <button onClick={pushNewPhoto} type="submit" className="btn">Submit</button>
                  </div>
                </form>
             </div>
                
            </div>
        )
    }
}

export default withFirebase(AddNewPhoto);