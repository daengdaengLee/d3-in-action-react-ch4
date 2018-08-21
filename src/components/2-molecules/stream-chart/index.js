import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const xScale = d3
  .scaleLinear()
  .domain([1, 10.5])
  .range([20, 470]);

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

const movieLine = name =>
  d3
    .line()
    .x(d => xScale(d.day))
    .y(d => yScale(d[name]))
    .curve(d3.curveCardinal);

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class StreamChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csv: [],
    };
  }

  render() {
    const { csv } = this.state;
    const movieNames = Object.keys(csv[0] || {}).filter(name => name !== 'day');
    return (
      <Svg>
        <g transform="translate(50, 50)">
          <g ref={el => d3.select(el).call(xAxis)} />
          <g ref={el => d3.select(el).call(yAxis)} />
          {movieNames.map(name => (
            <path
              key={name}
              d={movieLine(name)(csv)}
              fill="none"
              stroke="black"
              strokeWidth="3"
              opacity="0.75"
            />
          ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    d3.csv('/movies.csv').then(csv => this.setState({ csv }));
  }
}

export default StreamChart;
