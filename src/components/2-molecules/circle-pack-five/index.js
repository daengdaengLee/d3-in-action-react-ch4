import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import JSONTable from '../json-table';
import tweetsJSON from '../../../assets/resources/tweets';

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Svg = styled.svg`
  min-height: 680px;
  width: 100%;
`;

class CirclePackFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const { _packChart, _depthScale } = this;
    const { data } = this.state;
    return (
      <Container>
        <Svg>
          <g transform="translate(150, 150)">
            {_packChart(data).map((obj, i) => (
              <circle
                key={i}
                r={obj.r}
                cx={obj.x}
                cy={obj.y}
                fill={_depthScale(obj.depth)}
              />
            ))}
          </g>
        </Svg>
        <JSONTable json={tweetsJSON.tweets} />
      </Container>
    );
  }

  componentDidMount() {
    const { tweets } = tweetsJSON;
    const nestedTweets = {
      key: 'All Tweets',
      values: d3
        .nest()
        .key(tweet => tweet.user)
        .entries(tweets),
    };
    this.setState({ data: nestedTweets });
  }

  _depthScale(depth) {
    return d3
      .scaleOrdinal()
      .domain([0, 1, 2])
      .range(d3.schemeCategory10)(depth);
  }

  _packChart(data) {
    if (data.length === 0) return data;
    const layout = d3
      .pack()
      .size([500, 500])
      .padding(10);
    const root = d3
      .hierarchy(data, d => d.values)
      .sum(
        d =>
          d.retweets && d.favorites
            ? d.retweets.length + d.favorites.length + 1
            : 1,
      );
    return layout(root).descendants();
  }
}

export default CirclePackFive;
