import React, { Component } from 'react';


class UserEvents extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <ul>
                    {this.props.events.map( event => (
                        <li key={event.id} id={event.id} onClick={this.props.handleClick}>
                            {event.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default UserEvents;