import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class TreeChartFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const { _treeChart, _depthScale, _linkGenerator } = this;
    const { data } = this.state;
    const tree = _treeChart(data);
    const nodes = !tree.descendants ? [] : tree.descendants();
    const links = !tree.links ? [] : tree.links();
    return (
      <Svg>
        <g id="treeG" transform="translate(40, 40)">
          {links.map((obj, i) => (
            <path
              key={i}
              d={_linkGenerator(obj)}
              fill="none"
              stroke="black"
              strokeWidth="2px"
            />
          ))}
          {nodes.map((obj, i) => (
            <g
              key={i}
              className="node"
              transform={`translate(${obj.x}, ${obj.y})`}
            >
              <circle
                r="10"
                fill={_depthScale(obj.depth)}
                stroke="white"
                strokeWidth="2px"
              />
              <text>{obj.data.id || obj.data.key || obj.data.content}</text>
            </g>
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

  _linkGenerator({ source, target }) {
    return `M ${source.x},${source.y} C ${source.x},${(source.y + target.y) /
      2} ${target.x},${(source.y + target.y) / 2} ${target.x},${target.y}`;
  }

  _treeChart(data) {
    if (data.length === 0) return data;
    const layout = d3.tree().size([500, 500]);
    const root = d3.hierarchy(data, d => d.values);
    return layout(root);
  }
}

export default TreeChartFive;
