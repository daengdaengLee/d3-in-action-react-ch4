import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

const xScale = d3
  .scaleLinear()
  .domain([1, 8])
  .range([20, 470]);
const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([480, 20]);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(-470)
  .tickFormat(d3.format('d'))
  .tickValues([1, 2, 3, 4, 5, 6, 7]);

const yAxis = d3
  .axisRight()
  .scale(yScale)
  .ticks(8)
  .tickSize(-470);

class BoxplotChart extends Component {
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
        <g transform="translate(24, 24)">
          <g
            transform="translate(0, 480)"
            ref={el => d3.select(el).call(xAxis)}
          />
          <g
            transform="translate(470, 0)"
            ref={el => d3.select(el).call(yAxis)}
          />
          {csv.map(obj => (
            <circle
              key={obj.day}
              r="5"
              cx={xScale(obj.day)}
              cy={yScale(obj.median)}
              fill="darkgray"
            />
          ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    d3.csv('/boxplot.csv').then(res => this.setState({ csv: res }));
  }
}

export default BoxplotChart;
