import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import Messages from './Messages';


const mapStateToProps = store => ({
    currMsg: store.userTraffic.currMsg,
    msgsArr: store.userTraffic.msgsArr,
    socket: store.userTraffic.socket
  });
  
const mapDispatchToProps = dispatch => ({
    sendMessage: (currentMessage) => {
        dispatch(actions.sendMessage(currentMessage))
    },
    newCurrMsg: (event) => {
        dispatch(actions.newCurrMsg(event.target))
    }
});


class Chat extends Component {
    constructor(props) {
        super(props);

        
    }

    componentDidMount(){
        this.props.socket.on('connect', function(msg) {console.log('message ', msg)});
        this.props.socket.on('message', this.props.sendMessage(this.props.currMsg));
       
    }

    render() {

        const msgs = this.props.msgsArr.map(message =>
            <Messages messages={message} ></Messages>
          )

        return (
        <div>
            <ul id="messages">
            {msgs}
            </ul>
            <input type="text" onChange={(e) => this.props.newCurrMsg(e)} id="textBox" ></input><button onClick={(e) => { e.preventDefault(); this.props.socket.emit('message', this.props.currMsg)}} >Send</button>
        </div>
        )
        
    }
    }



export default connect(mapStateToProps, mapDispatchToProps) (Chat); 


// onClick={(e) => { e.preventDefault(); this.props.createuser(this.props.username, this.props.password)}}