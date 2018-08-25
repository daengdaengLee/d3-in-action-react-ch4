import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
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
      <Svg>
        <g transform="translate(250, 250)">
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
    );
  }

  componentDidMount() {
    d3.json('/tweets.json')
      .then(res => res.tweets)
      .then(tweets =>
        d3
          .nest()
          .key(obj => obj.user)
          .entries(tweets),
      )
      .then(nestedTweets => ({ key: 'All Tweets', values: nestedTweets }))
      .then(data => this.setState({ data }))
      .catch(() => this.setState({ data: {} }));
  }

  _depthScale(depth) {
    return d3
      .scaleOrdinal()
      .domain([0, 1, 2])
      .range(d3.schemeCategory10)(depth);
  }

  _packChart(data) {
    if (data.length === 0) return data;
    const layout = d3.pack().size([500, 500]);
    const root = d3.hierarchy(data, d => d.values).sum(d => 1);
    return layout(root).descendants();
  }
}

export default CirclePackFive;
