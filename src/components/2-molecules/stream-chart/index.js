import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const simpleStacking = (incomingData, incomingAttribute) => {
  const keys = Object.keys(incomingData);
  const idx = keys.findIndex(key => key === incomingAttribute);
  return keys.reduce(
    (acc, cur, curIdx) =>
      curIdx > idx || cur === 'day'
        ? acc
        : acc + parseInt(incomingData[cur], 10),
    0,
  );
};

const fillScale = d3
  .scaleLinear()
  .domain([0, 5])
  .range(['lightgray', 'black']);

const xScale = d3
  .scaleLinear()
  .domain([1, 10.5])
  .range([20, 470]);

const yScale = d3
  .scaleLinear()
  .domain([0, 50])
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

const movieArea = name =>
  d3
    .area()
    .x(d => xScale(d.day))
    .y1(d => yScale(simpleStacking(d, name)))
    .y0(d => yScale(simpleStacking(d, name) - parseInt(d[name], 10)))
    .curve(d3.curveBasis);

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
          {movieNames.map((name, i) => (
            <path
              key={name}
              d={movieArea(name)(csv)}
              fill={fillScale(i)}
              stroke="none"
              strokeWidth="2"
              opacity="0.5"
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
