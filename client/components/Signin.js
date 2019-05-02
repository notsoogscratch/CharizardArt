import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';

let homeloaded = false;
let signuploaded = false;


const mapStateToProps = store => ({
  username: store.userTraffic.username,
  password: store.userTraffic.password,
  verified: store.userTraffic.verified,
  error: store.userTraffic.error,
  needsToSignup: store.userTraffic.needsToSignup,
  googleSignedIn: store.userTraffic.googleSignedIn
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
  fetchUser: (event) => {
    dispatch(actions.fetchUser(event))
  },
  googleLogin: (event) => {
    dispatch(actions.googleLogin(event.target))
  }
})

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleSignedIn: false
    }
    this.click = this.click.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchUser();
  // }

  click() {
    Axios.get('/api/current_user/')
      .then(res => {
        // console.log('google id --->', res.data.googleID);
        if (res.data.googleID) {
          this.props.googleLogin(res.data.googleID);
        }
      });
  }

  render() {
    if ((this.props.verified === true || this.props.googleSignedIn === true) && homeloaded === false) {
      homeloaded = true;
      return <Redirect to="/Home"></Redirect>
    }
    else if (this.props.needsToSignup === true && signuploaded === false) {
      signuploaded = true;
      return <Redirect to="/signup"></Redirect>
    }




    return (
      <div>
        <h3>Please Login</h3>
        <label for="loginUsername">Username</label>
        <input type="text" onChange={(e) => this.props.loginUsername(e)} id="username" placeholder="username"></input>
        <label for="loginPassword">Password</label>
        <input type="password" onChange={(e) => this.props.loginPassword(e)} id="password" placeholder="password"></input>
        <button onClick={(e) => { e.preventDefault(); this.props.verifyLogin(this.props.username, this.props.password) }}>Login</button>
        <br></br>
        <br></br>
        <button onClick={(e) => { e.preventDefault(); this.props.signup() }}>Signup</button>
        <button onClick={this.click}>Sign In to Google</button>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);