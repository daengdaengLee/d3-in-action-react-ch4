import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

// const calculateCoords = ([x, y]) => {
//   const degree = x - 90;
//   const rotatedX = 40 * Math.cos(degree) - 40 * Math.sin(degree);
//   const rotatedY = 40 * Math.sin(degree) + 40 * Math.cos(degree);
//   const newX = rotatedX + y;
//   const newY = rotatedY;
//   return [newX, newY];
// };

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
    this.treeG = React.createRef();
    this._treeChart = this._treeChart.bind(this);
    this._changeDirection = this._changeDirection.bind(this);
    this._treeZoom = this._treeZoom.bind(this);
    this._zoomed = this._zoomed.bind(this);
  }

  render() {
    const {
      treeG,
      _treeChart,
      _depthScale,
      _vLinkGenerator,
      _hLinkGenerator,
      _rLinkGenerator,
      _changeDirection,
      _treeZoom,
    } = this;
    const { data, direction } = this.state;
    const tree = _treeChart(data);
    const nodes = !tree.descendants ? [] : tree.descendants();
    const links = !tree.links ? [] : tree.links();
    return (
      <Fragment>
        <button onClick={() => _changeDirection('V')}>Vertical</button>
        <button onClick={() => _changeDirection('H')}>Horizontal</button>
        <button onClick={() => _changeDirection('R')}>Radial</button>
        <Svg innerRef={el => d3.select(el).call(_treeZoom())}>
          <g className="treeG" transform="translate(40, 40)" ref={treeG}>
            {links.map((obj, i) => (
              <path
                key={i}
                d={
                  direction === 'V'
                    ? _vLinkGenerator(obj)
                    : direction === 'H'
                      ? _hLinkGenerator(obj)
                      : _rLinkGenerator(obj)
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
                transform={
                  direction === 'V'
                    ? `translate(${obj.x}, ${obj.y})`
                    : direction === 'H'
                      ? `translate(${obj.y}, ${obj.x})`
                      : `rotate(${obj.x - 90})translate(${obj.y}, 0)`
                }
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

  _rLinkGenerator({ source, target }) {
    return null;
  }

  _treeChart(data) {
    if (data.length === 0) return data;
    const { direction } = this.state;
    const size = direction === 'R' ? [200, 200] : [500, 500];
    const layout = d3.tree().size(size);
    const root = d3.hierarchy(data, d => d.values);
    return layout(root);
  }

  _changeDirection(direction) {
    this.setState({ direction });
  }

  _treeZoom() {
    const { _zoomed } = this;
    return d3.zoom().on('zoom', _zoomed);
  }

  _zoomed() {
    const { treeG } = this;
    const { x, y } = d3.event.transform;
    treeG.current.setAttribute('transform', `translate(${x}, ${y})`);
  }
}

export default TreeChartFive;
