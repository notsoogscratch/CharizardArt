import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';
// import test1 from './Test1';
// import MainContainer from './containers/MainContainer.jsx';

let loaded = false;

const mapStateToProps = store => ({
//   username: store.userTraffic.username,
//   password: store.userTraffic.password,
  verified: store.userTraffic.verified,
  error: store.userTraffic.error
});


class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.verified != true && loaded === false) {
        loaded = true;
        return <Redirect to="/signin"></Redirect>
    }
    // if (this.props.verified === true && loaded === false) {
    //   loaded = true;
    //   return <Redirect to="/test2"></Redirect>
    // }

    return (
      <div>
        <h1 class="vectro"><span class="vectro-body">Welcome to the Artful Collective</span></h1>
      </div>
    )
    
  }
}

export default connect(mapStateToProps)(Main);