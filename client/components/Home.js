import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';

let displayArt;

const mapStateToProps = store => ({
  error: store.userTraffic.error,
  art: store.userTraffic.art,
});

const mapDispatchToProps = dispatch => ({
  getArt: () => {
    dispatch(actions.getArt())
  }
});


class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // fetch('http://localhost:3000/api/getallart')
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(res => {
    //     console.log('this is res in component did mount ', res)
    //     return displayArt = res.map(el => {
    //       return (
    // <div className="artUnit">
    //   <img src={el.image} style={{ height: 800 }}></img>
    //   <p className="unitTitle"><strong>{el.title}</strong></p>
    //   <p>Description: {el.description}</p>
    //   <p>Material: {el.material}</p>
    //   <p>Price: {el.price}</p>
    // </div>
    //       )
    //     })
    //   })
    this.props.getArt();
  }

  render() {
    const formattedArt = [];

    console.log('ART IN HOME', this.props.art);
    // for (let i = 0; i < this.props.art.length; i++) {
    //   formattedArt.push(
    //     <div className="artUnit">
    //       <img src={el.image} style={{ height: 800 }}></img>
    //       <p className="unitTitle"><strong>{el.title}</strong></p>
    //       <p>Description: {el.description}</p>
    //       <p>Material: {el.material}</p>
    //       <p>Price: {el.price}</p>
    //     </div>
    //   );
    // }


    return (
      <div>
        <h2>Current Art Available</h2>
        {/* {console.log('this is display art', displayArt)} */}
        {/* {displayArt} */}
        {formattedArt}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);