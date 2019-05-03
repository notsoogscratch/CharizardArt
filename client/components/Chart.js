import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';

const mapStateToProps = store => ({
  error: store.userTraffic.error,

})

const mapDispatchToProps = dispatch => ({
  getStats: () => {
    dispatch(actions.getStats())
  }
})

class Chart extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    getStats();
   
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Chart) 