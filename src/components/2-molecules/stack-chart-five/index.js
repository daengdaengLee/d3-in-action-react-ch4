import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

class StackChartFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this._colorScale = this._colorScale.bind(this);
    this._stackArea = this._stackArea.bind(this);
  }

  render() {
    const { _stackLayout, _colorScale, _stackArea } = this;
    const { data } = this.state;
    const stackData = data.length === 0 ? [] : _stackLayout(data);
    stackData.sort((a, b) => a.index - b.index);
    return (
      <Svg>
        {stackData.map(series => (
          <path
            key={series.key}
            className={series.key}
            fill={_colorScale(series.key)}
            d={_stackArea(series)}
          />
        ))}
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

  _xScale(x) {
    return d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, 500])(x);
  }

  _yScale(y) {
    return d3
      .scaleLinear()
      .domain([0, 100])
      .range([500, 0])(y);
  }

  _colorScale(movie) {
    return d3
      .scaleOrdinal()
      .domain(['movie1', 'movie2', 'movie3', 'movie4', 'movie5', 'movie6'])
      .range(d3.schemeCategory10)(movie);
  }

  _stackArea(value) {
    const { _xScale, _yScale } = this;
    return d3
      .area()
      .curve(d3.curveBasis)
      .x(d => _xScale(d.data.day))
      .y0(d => _yScale(d[0]))
      .y1(d => _yScale(d[1]))(value);
  }

  _stackLayout(data) {
    return d3
      .stack()
      .keys(data.columns.filter(col => col !== 'day'))
      .offset(d3.stackOffsetSilhouette)
      .order(d3.stackOrderInsideOut)(data);
  }
}

export default StackChartFive;
