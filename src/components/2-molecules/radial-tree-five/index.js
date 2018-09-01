import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class RadialTreeFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.clusterG = React.createRef();
    this._zoom = this._zoom.bind(this);
    this._zoomed = this._zoomed.bind(this);
    this._lineGenerator = this._lineGenerator.bind(this);
  }

  render() {
    const {
      clusterG,
      _zoom,
      _cluster,
      _lineGenerator,
      _depthScale,
      _project,
    } = this;
    const { data } = this.state;
    const cluster = _cluster(data);
    const nodes = !cluster.descendants ? [] : cluster.descendants();
    const links = !cluster.links ? [] : cluster.links();

    console.log(nodes, links);
    return (
      <Svg innerRef={el => d3.select(el).call(_zoom())}>
        <g className="clusterG" transform="translate(40, 40)" ref={clusterG}>
          {links.map((link, i) => (
            <path
              key={i}
              d={_lineGenerator(link)}
              fill="none"
              stroke="black"
              strokeWidth="2px"
            />
          ))}
          {nodes.map((node, i) => (
            <g
              key={i}
              className="node"
              transform={`translate(${_project(node.x, node.y)})`}
            >
              <circle
                r="10"
                fill={_depthScale(node.depth)}
                stroke="white"
                strokeWidth="2px"
              />
              <text>{node.data.id || node.data.key || node.data.content}</text>
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
      .catch(() => this.setState({ data: [] }));
  }

  _depthScale(depth) {
    return d3
      .scaleOrdinal()
      .domain([0, 1, 2])
      .range(d3.schemeCategory10)(depth);
  }

  _lineGenerator({ source, target }) {
    const { _project } = this;
    return `M ${_project(source.x, source.y)} L ${_project(
      target.x,
      target.y,
    )}`;
  }

  _project(x, y) {
    const angle = ((x - 90) / 180) * Math.PI;
    const radius = y * 0.5;
    const newX = radius * Math.cos(angle);
    const newY = radius * Math.sin(angle);
    return `${newX}, ${newY}`;
  }

  _cluster(data) {
    if (data.length === 0) return data;
    const size = [500, 500];
    const layout = d3.cluster().size(size);
    const root = d3.hierarchy(data, d => d.values);
    return layout(root);
  }

  _zoom() {
    const { _zoomed } = this;
    return d3.zoom().on('zoom', _zoomed);
  }

  _zoomed() {
    const { clusterG } = this;
    const { x, y } = d3.event.transform;
    clusterG.current.setAttribute('transform', `translate(${x}, ${y})`);
  }
}

export default RadialTreeFive;
