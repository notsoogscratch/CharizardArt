import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';
import Artwork from './Artwork'

let displayArt;
let goChat = false;

const mapStateToProps = store => ({
  error: store.userTraffic.error,
  art: store.userTraffic.art,
  goToChat: store.userTraffic.goToChat,
  goToStats: store.userTraffic.goToStats,
});

const mapDispatchToProps = dispatch => ({
  getArt: () => {
    dispatch(actions.getArt())
  },
  chat: () => {
    dispatch(actions.chat())
  },
  stats: () => {
    dispatch(actions.stats())
  }
});


class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/getallart')
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log('this is res in component did mount ',res)
      return displayArt = res.map(el => {
        console.log('res', res)
        return (
        <div className="artUnit">
        <img src={el.image} style={{height: 800 }}></img>
        <p className="unitTitle"><strong>{el.title}</strong></p>
        <p>Description: {el.description}</p>
        <p>Material: {el.material}</p>
        <p>Price: {el.price}</p>
        </div>
        )
    })
  })
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log('this is res in componened did mount ', res)
        return displayArt = res.map(el => {
          console.log('res', res)
          return (
            <div className="artUnit">
              <img src={el.image} style={{ height: 800 }}></img>
              <p className="unitTitle"><strong>{el.title}</strong></p>
              <p>Description: {el.description}</p>
              <p>Material: {el.material}</p>
              <p>Price: {el.price}</p>
            </div>
          )
        })
      })
    this.props.getArt();
  }

  render() {
    if (this.props.goToChat === true && goChat === false) {
      goChat = true;
      return <Redirect to="/chat"></Redirect>
    }
      if(this.props.goToStats === true) {
        return <Redirect to="/stats"></Redirect>
      }

    const artwork = this.props.art.map(el =>
      <Artwork art={el} ></Artwork>
    )

    return (
      <div>
        <button className="chat" onClick={(e) => { e.preventDefault(); this.props.chat()}}>Go to Chat</button>
        <button className="stats" onClick={(e) => { e.preventDefault(); this.props.stats()}}>Go to Stats</button>

        <button id="goToChat" onClick={(e) => { e.preventDefault(); this.props.chat()}}>Go to Chat</button>
        <button id="goToChat" onClick={(e) => { e.preventDefault(); this.props.chat() }}>Go to Chat</button>
        <h2>Current Art Available</h2>
        {console.log('this is display art', { displayArt })}
        {displayArt}
        {artwork}
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);