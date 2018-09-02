import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import CSVTable from '../csv-table';

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Svg = styled.svg`
  min-height: 680px;
`;

class ScatterChartFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: [
        { friends: 5, salary: 22000 },
        { friends: 3, salary: 18000 },
        { friends: 10, salary: 88000 },
        { friends: 0, salary: 180000 },
        { friends: 27, salary: 56000 },
        { friends: 8, salary: 74000 },
      ],
    };
    this._xScale = this._xScale.bind(this);
    this._yScale = this._yScale.bind(this);
    this._xAxis = this._xAxis.bind(this);
    this._yAxis = this._yAxis.bind(this);
  }

  render() {
    const { _xScale, _yScale, _xAxis, _yAxis } = this;
    const { scatterData } = this.state;
    return (
      <Container>
        <CSVTable
          csv={`friends,salary\n${scatterData
            .map(obj => `${obj.friends},${obj.salary}`)
            .join('\n')}`}
        />
        <Svg>
          <g transform="translate(30, 30)">
            <g ref={el => d3.select(el).call(_xAxis())} />
            <g ref={el => d3.select(el).call(_yAxis())} />
            {scatterData.map((obj, i) => (
              <circle
                key={i}
                r="5"
                cx={_xScale()(obj.salary)}
                cy={_yScale()(obj.friends)}
              />
            ))}
          </g>
        </Svg>
      </Container>
    );
  }

  _xScale() {
    const { scatterData } = this.state;
    const xExtent = d3.extent(scatterData, obj => obj.salary);
    const xScale = d3
      .scaleLinear()
      .domain(xExtent)
      .range([0, 480]);
    return xScale;
  }

  _yScale() {
    const { scatterData } = this.state;
    const yExtent = d3.extent(scatterData, obj => obj.friends);
    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([0, 480]);
    return yScale;
  }

  _xAxis() {
    const { _xScale } = this;
    return d3
      .axisBottom()
      .scale(_xScale())
      .tickSize(480)
      .ticks(4);
  }

  _yAxis() {
    const { _yScale } = this;
    return d3
      .axisRight()
      .scale(_yScale())
      .tickSize(480)
      .ticks(16);
  }
}

export default ScatterChartFour;
