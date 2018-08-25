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
    return (
      <Svg>
        <g transform="translate(250, 250)">'hi'</g>
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
}

export default CirclePackFive;
