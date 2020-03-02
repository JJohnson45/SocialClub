import React, { Component } from "react";
import "./App.css";
//import { hot } from "react-hot-loader";
import MapContainer from "./Components/MapContainer"
import axios from 'axios'
import  { onSignIn } from "../dist/script"
//Topbar Menu imports
import MenuItem from "./MenuItem"
import Menu from './Menu'
import MenuButton from './MenuButton'
//Chatkit
import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';
import UserProfile from './Components/userProfile';
import GoogleLogin  from "react-google-login"
import CreateEvent from "./CreateEvent";
import Home from "./Components/Home"
import UserEvents from "./Components/UserEvents";
import AttendingEvents from "./Components/AttendingEvents";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleUser: [],
      menuOpen: false,
      currentUsername: '',
      currentId: '',
      currentView: 'Signup',
      appView: 'Home'
    }
   //console.log(googleUser);
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
    //this.signOut = this.signOut.bind(this)
    this.createEvent = this.createEvent.bind(this)
    this.getUserEvents = this.getUserEvents.bind(this);
    this.postUser = this.postUser.bind(this);
  }

//create event button on click changes appView
  createEvent () {
    this.setState({
      appView: 'CreateEvent'
    })
  }

  postUser () {

    axios({
      method: 'post',
      url: `api/db/users/`,
      data: {
        username: this.state.currentUsername,
        email: this.state.googleUser.profileObj.email
      }
  })
}

  getUserEvents () {
    console.log('getEvents')
    axios({
      method: 'get',
      url: `api/db/events/${this.state.currentUsername}`,
    }).then()
  }



  changeView(view) {
    this.setState({
      currentView: view
    })
  }

//   signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     alert("You have been successfully signed out");
//     $(".g-signin2").css("display", "block");
//     $(".data").css("display", "none");
//   })
// }
  //chat sign up
  createUser(username) {
    axios({
      method: 'post',
      url: 'api/chatkit/users',
      data: {
        id: username,
        name: username,
      }
    })
    .then((res) => {
      console.log(res.data.id)
      this.setState({
        currentUsername: res.data.name,
        currentId: res.data.id,
        currentView: 'chatApp'
      })
    }).catch((err) => {
      console.log(err)
      if (err.status === 400) {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      } else {
        console.log(err.status);
      }
    });
  }
  //Menu handler
  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleLinkClick(link) {
    this.setState({ menuOpen: false });
    this.setState({appView: link.val})
  }
  render() {
    //
    const responseGoogle = (response) => {
      console.log(response)
    }
    //
    const onSignIn = (googleUser) => {
      console.log(googleUser, "settingstate");
      this.setState({
        appView: 'Profile Page',
        currentUsername: googleUser.profileObj.name,
        googleUser: googleUser
      })
      this.postUser()
      // this.getUserEvents()
    }
    
    //navbar css
    const styles =
    {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: '99',
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        background: 'black',
        width: '100%',
        color: 'white',
        fontFamily: 'Lobster',
      },
      logo: {
        margin: '0 auto',
      },
      body: {
        paddingTop: '65px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        filter: this.state.menuOpen ? 'blur(2px)' : null,
        transition: 'filter 0.5s ease',
      },
    }
    //navbar menu items
    const menu = ['Home', 'Created Events', 'RSVP\'d Events', 'Profile Page']
    const menuItems = menu.map((val, index) => {
      return (
        <MenuItem
          key={index}
          delay={`${index * 0.1}s`}
          onClick={() => { this.handleLinkClick({val}); }}>{val}</MenuItem>)

    }
    );

    //chatbox condition render
    let view ='';
    
    if (this.state.currentView === "ChatMessage") {
        view = <ChatMessage  changeView={this.changeView}/>
    } else if (this.state.currentView === "Signup") {
        view = <Signup onSubmit={this.createUser}/>
    } else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentid={this.state.currentId} />
     } 
    

    let appView = '';
    if (this.state.appView === 'Home') {
      appView = <Home handleClick={this.createEvent} />
    } else if (this.state.appView === 'CreateEvent'){
      appView = <CreateEvent currentUser={this.state.currentUsername} />
    } else if (this.state.appView === 'Created Events'){
      appView = <UserEvents />
    } else if (this.state.appView === 'RSVP\'d Events') {
      appView = <AttendingEvents />
    } 
    else if (this.state.appView === 'Profile Page') {
      appView = <UserProfile user = {this.state.googleUser} userName = {this.state.currentUsername}></UserProfile>
    }
      
    return (
      <div>
        <div className="g-signin2">
        <GoogleLogin
          clientId="870155244088-hav8sg0oo71s181ghhetvqdgrssuo8ln.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onSignIn}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
          </div>
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color='white' />
          <div style={styles.logo}>Social Club</div>
        </div>
        <div>
        <Menu open={this.state.menuOpen}>
          
          {menuItems}
        </Menu>
        </div>
        {appView}
      </div>
    );
  }
}

export default App;