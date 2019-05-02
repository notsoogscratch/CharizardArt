import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';

let homeloaded = false;
let signuploaded = false;

const mapStateToProps = store => ({
  username: store.userTraffic.username,
  password: store.userTraffic.password,
  verified: store.userTraffic.verified,
  error: store.userTraffic.error,
  needsToSignup: store.userTraffic.needsToSignup,
});

const mapDispatchToProps = dispatch => ({
  loginUsername: (event) => {
    dispatch(actions.loginUsername(event.target))
  },
  loginPassword: (event) => {
    dispatch(actions.loginPassword(event.target))
  },
  verifyLogin: (username, password) => {
    dispatch(actions.verifyLogin(username, password))
  },
  signup: () => {
    dispatch(actions.signup())
  },
})
class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.verified === true && homeloaded === false) {
      homeloaded = true;
      return <Redirect to="/Home"></Redirect>
    }
    else if (this.props.needsToSignup === true && signuploaded === false) {
      signuploaded = true;
      return <Redirect to="/signup"></Redirect>
    }

    return (
      <center>
      <div className="signInBunch">
        <h3 className="pleaseLogIn">Please Login</h3>
        <label className="loginUName" htmlFor="loginUsername">Username</label>
        <input className="inputLoginUName" type="text" onChange={(e) => this.props.loginUsername(e)} id="username" placeholder="username"></input>
        <label className="loginPassword" htmlFor="loginPassword">Password</label>
        <input className="inputLoginPassword" type="password" onChange={(e) => this.props.loginPassword(e)} id="password" placeholder="password"></input>
        <button onClick={(e) => { e.preventDefault(); this.props.verifyLogin(this.props.username, this.props.password)}}>Login</button>
        <br></br>
        <br></br>
        <button onClick={(e) => { e.preventDefault(); this.props.signup()}}>Signup</button>
      </div>
      </center>
    )
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);