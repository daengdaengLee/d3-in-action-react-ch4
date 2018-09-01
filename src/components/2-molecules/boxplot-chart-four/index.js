import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import CSVTable from '../csv-table';
import boxplotCSV from '../../../assets/resources/boxplot.js';
import './index.css';

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
`;

const Svg = styled.svg`
  width: 0;
  flex-grow: 1;
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

class BoxplotChartFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csv: [],
      selected: '',
    };
    this._handleClickBox = this._handleClickBox.bind(this);
    this._colorScale = this._colorScale.bind(this);
  }

  render() {
    const { _handleClickBox, _colorScale } = this;
    const { csv, selected } = this.state;
    return (
      <Container>
        <CSVTable csv={boxplotCSV} />
        <Svg className="__BoxplotChart">
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
                transform={`translate(${xScale(obj.day)}, ${yScale(
                  obj.median,
                )})`}
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
                  onClick={e => _handleClickBox({ ...e, _day: obj.day })}
                  data-box={obj.day}
                  width="20"
                  height={yScale(obj.q1) - yScale(obj.q3)}
                  x="-10"
                  y={yScale(obj.q3) - yScale(obj.median)}
                  fill={_colorScale(selected, obj.day)}
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
      </Container>
    );
  }

  componentDidMount() {
    const parsedCSV = d3.csvParse(boxplotCSV);
    this.setState({ csv: parsedCSV });
  }

  _handleClickBox({ _day }) {
    this.setState(prevState => ({
      ...prevState,
      selected: prevState.selected === _day ? '' : _day,
    }));
  }

  _colorScale(selectedDay, currentDay) {
    const { csv } = this.state;
    const numExtent = d3.extent(csv, obj => parseInt(obj.number, 10));
    const target = csv.find(obj => obj.day === currentDay);
    return selectedDay !== currentDay
      ? 'white'
      : d3
        .scaleLinear()
        .interpolate(d3.interpolateHcl)
        .domain(numExtent)
        .range(['yellow', 'blue'])(parseInt(target.number, 10));
  }
}

export default BoxplotChartFour;
