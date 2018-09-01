import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import JSONTable from '../json-table';
import tweetsJSON from '../../../assets/resources/tweets';

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
`;

const Svg = styled.svg`
  width: 0;
  flex-grow: 1;
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
      _changeDirection,
      _treeZoom,
    } = this;
    const { data, direction } = this.state;
    const tree = _treeChart(data);
    const nodes = !tree.descendants ? [] : tree.descendants();
    const links = !tree.links ? [] : tree.links();
    return (
      <Container>
        <div>
          <JSONTable json={tweetsJSON.tweets} />
          <button onClick={() => _changeDirection('V')}>Vertical</button>
          <button onClick={() => _changeDirection('H')}>Horizontal</button>
        </div>
        <Svg innerRef={el => d3.select(el).call(_treeZoom())}>
          <g className="treeG" transform="translate(40, 40)" ref={treeG}>
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
                transform={
                  direction === 'V'
                    ? `translate(${obj.x}, ${obj.y})`
                    : `translate(${obj.y}, ${obj.x})`
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
      </Container>
    );
  }

  componentDidMount() {
    const { tweets } = tweetsJSON;
    const nestedTweets = {
      key: 'All Tweets',
      values: d3
        .nest()
        .key(obj => obj.user)
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
    const size = [500, 500];
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
