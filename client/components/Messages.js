import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';



class Messages extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    
    return (
        <div className="msgUnit">
        <li>{this.props.messages}</li>
        </div>
    )
  }
}
  
 export default Messages;