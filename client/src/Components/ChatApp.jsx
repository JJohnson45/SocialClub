
import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList.jsx';

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentRoom: { users: [] },
            messages: [],
            users: []
        }
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: "v1:us1:c505ed27-4164-40ae-93c1-3c5e0f669521",
            userId: this.props.currentid,
            tokenProvider: new TokenProvider({
                url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/c505ed27-4164-40ae-93c1-3c5e0f669521/token"
            })
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser })

                return currentUser.subscribeToRoom({
                    roomId: "a1fb050f-43ea-4c3a-a19d-ad9d767c06fb",
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                    }
                })
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom,
                    users: currentRoom.userIds
                })
            })
            .catch(error => console.log(error))
    }


    addMessage(text) {
        console.log(this.state);
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
            .catch(error => console.error('error', error));
    }

    render() {
        return (
            <div>
                <button data-toggle="collapse" data-target="#demo">-</button>
                <div id="demo" className="collapse">
                    <h2 className="header">Let's Talk</h2>
                    <MessageList messages={this.state.messages} />
                    <Input className="input-field" onSubmit={this.addMessage} />
                </div>
            </div>
        )
    }
}

export default ChatApp;