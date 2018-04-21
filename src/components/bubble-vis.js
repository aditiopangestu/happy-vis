import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries,
} from 'react-vis';

export default class BubbleVis extends Component {

  /*
    Props
    data = [datum]
    datum = {
      "name": "Eastern Asia",
      "value": 1.234
    }
    highlighted_data = {
      "name": "Turki",
      "value": 1.45
    }
    xMax = 15
    first = true
  */

  constructor(props) {
    super(props);
    this.state = {
      preprocessed_data : [
        {
          x0: 0,
          x: 1,
          y: 3
        }
      ]
    }
  }

  componentWillMount(){
    this.setState({
      ...this.state,
      preprocessed_data: this.preprocessedData(this.props.data)
    })
  }

  preprocessedData(data){
    var preprocessed_data = [];
    var ticks = [];
    for(var i=0;i<data.length;i++){
      const datum = data[i];
      preprocessed_data.push({
        x0:i,
        x:(i+1),
        y:datum.value,
        color: datum.color
      });
    }
    return preprocessed_data;
  }

  render(){
    
    return (
      <XYPlot
        colorType="literal"
        yDomain={[0, this.props.y_domain]}
        width={230}
        height={95}
        margin={{ top: 10, bottom: 10 }}
        stackBy="y">
        <VerticalGridLines />
        <HorizontalGridLines />
        <YAxis tickTotal={2}/>
        <VerticalRectSeries
          data={this.state.preprocessed_data}
        />
      </XYPlot>
    );
  }
}