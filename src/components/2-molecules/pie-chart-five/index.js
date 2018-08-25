import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class PieChartFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const { _newArc } = this;
    const { data } = this.state;
    return (
      <Svg>
        <g transform="translate(250, 250)">
          {/* {data.map(d => (
            <path
              key={d.index}
              d={_newArc()(d)}
              fill="blue"
              opacity="0.5"
              stroke="black"
              strokeWidth="2px"
            />
          ))} */}
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
          .entries(tweets)
          .map(obj => ({
            ...obj,
            numTweets: obj.values.length,
            numFavorites: d3.sum(obj.values, d => d.favorites.length),
            numRetweets: d3.sum(obj.values, d => d.retweets.length),
          })),
      )
      .then(data => this.setState({ data }))
      .catch(() => this.setState({ data: [] }));
  }

  _newArc() {
    return d3
      .arc()
      .outerRadius(100)
      .innerRadius(0);
  }
}

export default PieChartFive;
