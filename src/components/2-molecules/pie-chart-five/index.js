import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import tweetsJSON from '../../../assets/resources/tweets';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class PieChartFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: 'numTweets',
    };
    this._pieChartData = this._pieChartData.bind(this);
    this._handleClickPie = this._handleClickPie.bind(this);
  }

  render() {
    const { _newArc, _pieChartData, _handleClickPie } = this;
    return (
      <Svg>
        <g transform="translate(250, 250)">
          {_pieChartData().map(d => (
            <path
              key={d.data.key}
              d={_newArc()(d)}
              onClick={_handleClickPie}
              fill="blue"
              opacity="0.5"
              stroke="black"
              strokeWidth="2px"
              cursor="pointer"
            />
          ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    const { tweets } = tweetsJSON;
    const data = d3
      .nest()
      .key(obj => obj.user)
      .entries(tweets)
      .map(obj => ({
        ...obj,
        numTweets: obj.values.length,
        numFavorites: d3.sum(obj.values, d => d.favorites.length),
        numRetweets: d3.sum(obj.values, d => d.retweets.length),
      }));
    this.setState({ data });
  }

  _pieChartData() {
    const { data, type } = this.state;
    return d3
      .pie()
      .sort(null)
      .value(d => d[type])(data.filter(obj => obj[type] > 0));
  }

  _newArc() {
    return d3
      .arc()
      .outerRadius(100)
      .innerRadius(20);
  }

  _handleClickPie() {
    this.setState(prevState => ({
      ...prevState,
      type:
        prevState.type === 'numTweets'
          ? 'numFavorites'
          : prevState.type === 'numFavorites'
            ? 'numRetweets'
            : 'numTweets',
    }));
  }
}

export default PieChartFive;
