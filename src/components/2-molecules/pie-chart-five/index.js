import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class PiePiece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d: null,
    };
    this.path = React.createRef();
  }

  render() {
    const { d } = this.state;
    const { onClick } = this.props;
    return (
      !d || (
        <path
          ref={this.path}
          d={d}
          fill="blue"
          opacity="0.5"
          stroke="black"
          strokeWidth="2px"
          onClick={onClick}
        />
      )
    );
  }

  componentDidMount() {
    const { d } = this.props;
    this.setState({ d });
  }

  componentDidUpdate() {
    const { d } = this.props;
    d3.select(this.path.current)
      .transition()
      .duration(1000)
      .attr('d', d)
      .on('end', () => this.setState({ d }));
  }

  componentWillUnmount() {
    d3.select(this.path.current).interrupt();
  }
}

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
            <PiePiece
              key={d.index}
              d={_newArc()(d)}
              onClick={_handleClickPie}
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

  _pieChartData() {
    const { data, type } = this.state;
    return d3
      .pie()
      .sort(null)
      .value(d => d[type])(data);
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
