import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 80%;
`;

class TreeChartFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      direction: 'V',
    };
    this._changeDirection = this._changeDirection.bind(this);
  }

  render() {
    const {
      _treeChart,
      _depthScale,
      _vLinkGenerator,
      _hLinkGenerator,
      _changeDirection,
    } = this;
    const { data, direction } = this.state;
    const tree = _treeChart(data);
    const nodes = !tree.descendants ? [] : tree.descendants();
    const links = !tree.links ? [] : tree.links();
    return (
      <Fragment>
        <button onClick={() => _changeDirection('V')}>Vertical</button>
        <button onClick={() => _changeDirection('H')}>Horizontal</button>
        <Svg>
          <g id="treeG" transform="translate(40, 40)">
            {links.map((obj, i) => (
              <path
                key={i}
                d={
                  direction === 'V'
                    ? _vLinkGenerator(obj)
                    : _hLinkGenerator(obj)
                }
                fill="none"
                stroke="black"
                strokeWidth="2px"
              />
            ))}
            {nodes.map((obj, i) => (
              <g
                key={i}
                className="node"
                transform={`translate(${direction === 'V' ? obj.x : obj.y}, ${
                  direction === 'V' ? obj.y : obj.x
                })`}
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
      </Fragment>
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

  _vLinkGenerator({ source, target }) {
    return `M ${source.x},${source.y} C ${source.x},${(source.y + target.y) /
      2} ${target.x},${(source.y + target.y) / 2} ${target.x},${target.y}`;
  }

  _hLinkGenerator({ source, target }) {
    return `M ${source.y},${source.x} C ${(source.y + target.y) / 2},${
      source.x
    } ${(source.y + target.y) / 2},${target.x} ${target.y},${target.x}`;
  }

  _treeChart(data) {
    if (data.length === 0) return data;
    const layout = d3.tree().size([500, 500]);
    const root = d3.hierarchy(data, d => d.values);
    return layout(root);
  }

  _changeDirection(direction) {
    this.setState({ direction });
  }
}

export default TreeChartFive;
