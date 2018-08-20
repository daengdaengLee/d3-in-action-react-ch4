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
        <g transform="translate(50, 50)">
          <g
            transform="translate(0, 480)"
            ref={el => d3.select(el).call(xAxis)}
          />
          <g
            transform="translate(470, 0)"
            ref={el => d3.select(el).call(yAxis)}
          />
          {csv.map(obj => (
            <g
              key={obj.day}
              transform={`translate(${xScale(obj.day)}, ${yScale(obj.median)})`}
            >
              <line
                x1="0"
                y1={yScale(obj.max) - yScale(obj.median)}
                x2="0"
                y2={yScale(obj.min) - yScale(obj.median)}
                stroke="black"
                strokeWidth="4px"
              />
              <line
                x1="-10"
                y1={yScale(obj.max) - yScale(obj.median)}
                x2="10"
                y2={yScale(obj.max) - yScale(obj.median)}
                stroke="black"
                strokeWidth="4px"
              />
              <line
                x1="-10"
                y1={yScale(obj.min) - yScale(obj.median)}
                x2="10"
                y2={yScale(obj.min) - yScale(obj.median)}
                stroke="black"
                strokeWidth="4px"
              />
              <rect
                width="20"
                height={yScale(obj.q1) - yScale(obj.q3)}
                x="-10"
                y={yScale(obj.q3) - yScale(obj.median)}
                fill="white"
                stroke="black"
                strokeWidth="2px"
              />
              <line
                x1="-10"
                y1="0"
                x2="10"
                y2="0"
                stroke="darkgray"
                strokeWidth="4px"
              />
            </g>
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