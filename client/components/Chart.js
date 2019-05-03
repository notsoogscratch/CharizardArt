import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';
import {XYPlot, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines, LineSeries} from 'react-vis';
// import '../../node_modules/react-vis/dist/style.css';

console.log(actions, 'kdkdjdkdkddj')
const mapStateToProps = store => ({
  chartArr: store.userTraffic.chartArr,

})

const mapDispatchToProps = dispatch => ({
  getStats: () => {
    //console.log(getStats, 'here ')
    dispatch(actions.getStats())
  }
})

class Chart extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getStats();
  
  }

  render(){
    const data = this.props.chartArr;
  
      return (
        <XYPlot 
           width={300}
           height={300} >
          
            <VerticalBarSeries
                data={data}
            />
        </XYPlot>
    );
  }




}



export default connect(mapStateToProps, mapDispatchToProps)(Chart) 