import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class StackBarFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this._xAxis = this._xAxis.bind(this);
    this._yAxis = this._yAxis.bind(this);
  }

  render() {
    const {
      _stackLayout,
      _colorScale,
      _xScale,
      _yScale,
      _xAxis,
      _yAxis,
    } = this;
    const { data } = this.state;
    const xScale = _xScale();
    const yScale = _yScale();
    const xAxis = _xAxis(xScale);
    const yAxis = _yAxis(yScale);
    const stackData = data.length === 0 ? [] : _stackLayout(data);
    stackData.sort((a, b) => a.index - b.index);
    return (
      <Svg>
        <g transform="translate(80, 80)">
          <g className="xAxisG" ref={el => d3.select(el).call(xAxis)} />
          <g className="yAxisG" ref={el => d3.select(el).call(yAxis)} />
          {stackData.map(stack => (
            <g key={stack.key}>
              {stack.map((obj, i) => (
                <rect
                  key={i}
                  x={xScale(obj.data.day) - 15}
                  y={yScale(obj[1])}
                  width="30"
                  height={Math.abs(yScale(obj[0]) - yScale(obj[1]))}
                  fill={_colorScale(stack.key)}
                />
              ))}
            </g>
          ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    d3.csv('/movies.csv')
      .then(data => {
        data.forEach(obj =>
          Object.keys(obj).forEach(key => (obj[key] = parseInt(obj[key], 10))),
        );
        return data;
      })
      .then(data => this.setState({ data }));
  }

  _xScale() {
    return d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, 500]);
  }

  _yScale() {
    return d3
      .scaleLinear()
      .domain([0, 100])
      .range([500, 0]);
  }

  _xAxis(xScale) {
    return d3
      .axisBottom()
      .scale(xScale)
      .tickSizeInner(510)
      .ticks(10);
  }

  _yAxis(yScale) {
    return d3
      .axisRight()
      .scale(yScale)
      .tickSizeInner(540)
      .ticks(8);
  }

  _colorScale(movie) {
    return d3
      .scaleOrdinal()
      .domain(['movie1', 'movie2', 'movie3', 'movie4', 'movie5', 'movie6'])
      .range(d3.schemeCategory10)(movie);
  }

  _stackLayout(data) {
    return d3.stack().keys(data.columns.filter(col => col !== 'day'))(data);
  }
}

export default StackBarFive;
