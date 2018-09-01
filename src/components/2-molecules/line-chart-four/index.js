import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import CSVTable from '../csv-table';
import tweetdataCSV from '../../../assets/resources/tweetdata';

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

const tweetLine = d3
  .line()
  .x(d => xScale(d.day))
  .y(d => yScale(d.tweets));

const retweetLine = d3
  .line()
  .x(d => xScale(d.day))
  .y(d => yScale(d.retweets));

const favLine = d3
  .line()
  .x(d => xScale(d.day))
  .y(d => yScale(d.favorites));

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
`;

const Svg = styled.svg`
  width: 0;
  flex-grow: 1;
`;

class LineChartFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csv: [],
    };
  }

  render() {
    const { csv } = this.state;
    return (
      <Container>
        <CSVTable csv={tweetdataCSV} />
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
            <path
              d={tweetLine.curve(d3.curveCardinal)(csv)}
              fill="none"
              stroke="darkred"
              strokeWidth="2"
            />
            <path
              d={retweetLine.curve(d3.curveBasis)(csv)}
              fill="none"
              stroke="gray"
              strokeWidth="3"
            />
            <path
              d={favLine.curve(d3.curveStepBefore)(csv)}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </g>
        </Svg>
      </Container>
    );
  }

  componentDidMount() {
    const csv = d3.csvParse(tweetdataCSV);
    this.setState({ csv });
  }
}

export default LineChartFour;
