import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';



class Artwork extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {

    return (
      <div>
        <div className="artUnit">
        <img src={this.props.art.image} style={{height: 800 }}></img>
        <p className="unitTitle"><strong>{this.props.art.title}</strong></p>
        <p>Description: {this.props.art.description}</p>
        <p>Material: {this.props.art.material}</p>
        <p>Price: {this.props.art.price}</p>
        </div>
      </div>
    )
  }
}
  
 export default Artwork;