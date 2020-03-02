import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom'
import Home from "./Home";
class UserProfile extends Component {
  constructor(props){
    super(props);
    this.State = {
      appView: ""
    }
    //this.signOut = this.signOut.bind(this)
  }

  componentDidMount(){
    this.props.postUser()
    this.props.getUser()
    this.props.getUserEvents()
  }
  
  render (){
    // let appView = '';
    // if (this.State.appView === 'Home') {
    //  appView = < Redirect to = "./Home.jsx" /> 
    // }
    const signOut = () => {
      var auth2 = gapi.auth2.getAuthInstance();
      this.setState({
        appView: 'Home',
      })
      auth2.signOut().then(function () {
        alert("You have been successfully signed out");
        $(".g-signin2").css("display", "block");
        $(".profileRender").css("display", "none");
       
        //< Redirect to = "./Home.jsx" /> 
      })

    } 
    let appView = '';
    
  return (
    <div className = "profileRender">
      <img id="pic" className="img-circle" width="100" height="100" src={this.props.user.profileObj.imageUrl}/> 
      <h2 className="emailAddy"> Welcome Back {this.props.userName}!</h2>
      <div id="email" className="col-sm-4"> {this.props.user.profileObj.email}</div>
      <div id="name" className="col-sm-4"> {this.props.user.profileObj.name}</div>
      <div id="id" className="col-sm-4"> {this.props.user.profileObj.googleId}</div>
      <button className="dangerButton" onClick={signOut}>Sign Out</button>
      {appView}
    </div>
  )
  }
}
export default UserProfile;