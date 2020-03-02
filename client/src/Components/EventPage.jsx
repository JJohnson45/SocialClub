import React, { Component } from 'react';
import axios from 'axios'
//Chatkit
import ChatMessage from './ChatMessage';
import Signup from './Signup';
import ChatApp from './ChatApp';


class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventData: [],
            currentId: '',
            currentView: '',
            currentUsername: ''
        }
        this.changeView = this.changeView.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `api/db/events/page/${this.props.eventID}`,
        })
            .then(res => {
                this.setState({ eventData: res.data[0] })
            })

        this.createUser()
    }

    //chat view
    changeView(view) {
        this.setState({
            currentView: view
        })
    }

    //chat sign up
    createUser() {
        axios({
            method: 'post',
            url: 'api/chatkit/users',
            data: {
                id: this.props.googleUser.profileObj.email,
                name: this.props.googleUser.profileObj.name,
            }
        })
            .then((res) => {

                this.setState({
                    currentUsername: this.props.googleUser.profileObj.name,
                    currentId: this.props.googleUser.profileObj.email,
                    currentView: 'chatApp'
                })
            }).catch((err) => {
                console.log(err)

                this.setState({
                    currentUsername: this.props.googleUser.profileObj.name,
                    currentId: this.props.googleUser.profileObj.email,
                    currentView: 'chatApp'
                })

            });
    }

    render() {
        let view = '';

        if (this.state.currentView === "ChatMessage") {
            view = <ChatMessage changeView={this.changeView} />
        } else if (this.state.currentView === "Signup") {
            view = <Signup onSubmit={this.createUser} />
        } else if (this.state.currentView === "chatApp") {
            view = <ChatApp currentid={this.state.currentId} />
        }
        return (
            <div>
                <p>{this.state.eventData.name}</p>
                <p>Location:{this.state.eventData.address}</p>
                <p>Time: {this.state.eventData.time}</p>
                <p>Category: {this.state.eventData.category}</p>
                <p>Summary: {this.state.eventData.summary}</p>
                <div className="Chat">
                    {view}
                </div>
            </div>
        )
    }
}
export default EventPage;