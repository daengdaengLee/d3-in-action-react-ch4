import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const xScale = d3
  .scaleLinear()
  .domain([1, 10.5])
  .range([20, 480]);
const yScale = d3
  .scaleLinear()
  .domain([0, 35])
  .range([480, 20]);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(480)
  .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const yAxis = d3
  .axisRight()
  .scale(yScale)
  .ticks(10)
  .tickSize(480);

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csv: [],
    };
  }

  render() {
    const { csv } = this.state;
    return (
      <Svg>
        <g transform="translate(50, 50)">
          <g ref={el => d3.select(el).call(xAxis)} />
          <g ref={el => d3.select(el).call(yAxis)} />
          {csv.map(obj => (
            <circle
              key={obj.day}
              r="5"
              cx={xScale(obj.day)}
              cy={yScale(obj.tweets)}
              fill="black"
            />
          ))}
          {csv.map(obj => (
            <circle
              key={obj.day}
              r="5"
              cx={xScale(obj.day)}
              cy={yScale(obj.retweets)}
              fill="lightgray"
            />
          ))}
          {csv.map(obj => (
            <circle
              key={obj.day}
              r="5"
              cx={xScale(obj.day)}
              cy={yScale(obj.favorites)}
              fill="gray"
            />
          ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    d3.csv('/tweetdata.csv').then(csv => this.setState({ csv }));
  }
}

export default LineChart;
