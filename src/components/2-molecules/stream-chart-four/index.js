import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import moviesCSV from '../../../assets/resources/movies';

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

const streamStacking = (incomingData, incomingAttribute, topBottom, n) => {
  let newHeight = 0;
  let skip = true;

  for (let name in incomingData) {
    if (name !== 'day') {
      if (name === 'movie1' || skip === false) {
        newHeight += parseInt(incomingData[name], 10);
        if (name === incomingAttribute) break;
        if (skip === false) skip = true;
        else n % 2 ? (skip = false) : (skip = true);
      } else {
        skip = false;
      }
    }
  }

  if (topBottom === 'bottom') newHeight = -newHeight;
  if (n > 1 && n % 2 === 1 && topBottom === 'bottom') newHeight = 0;
  if (n > 1 && n % 2 === 0 && topBottom === 'top') newHeight = 0;
  return newHeight;
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

const xStreamScale = d3
  .scaleLinear()
  .domain([0, 11])
  .range([0, 500]);

const yStreamScale = d3
  .scaleLinear()
  .domain([-100, 100])
  .range([500, 0]);

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

const xStreamAxis = d3
  .axisBottom()
  .scale(xStreamScale)
  .tickSize(500)
  .ticks(4);

const yStreamAxis = d3
  .axisRight()
  .scale(yStreamScale)
  .tickSize(500)
  .ticks(16);

const movieArea = name =>
  d3
    .area()
    .x(d => xScale(d.day))
    .y1(d => yScale(simpleStacking(d, name)))
    .y0(d => yScale(simpleStacking(d, name) - parseInt(d[name], 10)))
    .curve(d3.curveBasis);

const movieStream = (name, i) =>
  d3
    .area()
    .x(d => xStreamScale(d.day))
    .y1(d => yStreamScale(streamStacking(d, name, 'top', i)))
    .y0(d => yStreamScale(streamStacking(d, name, 'bottom', i)))
    .curve(d3.curveBasis);

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class StreamChartFour extends Component {
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
        <g transform="translate(20, 50)">
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
        <g className="__StreamG" transform="translate(520, 50)">
          <g ref={el => d3.select(el).call(xStreamAxis)} />
          <g
            className="__YAxisG"
            ref={el => {
              d3.select(el).call(yStreamAxis);
              d3.selectAll('.__StreamG .__YAxisG .tick line').style(
                'stroke-dasharray',
                d => {
                  if (Math.floor(Math.abs(d) / 10) % 2 === 0) return null;
                  return 4;
                },
              );
              d3.selectAll('.__StreamG .__YAxisG .tick text').text(d => {
                if (Math.floor(Math.abs(d) / 10) % 2 === 0) return d;
                return null;
              });
            }}
          />
          {movieNames.reverse().map((name, i, { length }) => (
            <path
              key={name}
              d={movieStream(name, length - i - 1)(csv)}
              fill={fillScale(i)}
              stroke="white"
              strokeWidth="1"
              opacity="1"
            />
          ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    const csv = d3.csvParse(moviesCSV);
    this.setState({ csv });
  }
}

export default StreamChartFour;
