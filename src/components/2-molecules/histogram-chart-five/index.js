import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import './index.css';

const Svg = styled.svg`
  width: 100%;
  height: 99%;
`;

class HistoRect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      y: 0,
    };
    this.rect = React.createRef();
  }

  render() {
    const { rect } = this;
    const { className, onClick, width, x } = this.props;
    const { height, y } = this.state;
    return (
      <rect
        ref={rect}
        className={className}
        x={x}
        y={y}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
  }

  componentDidMount() {
    const { height, y } = this.props;
    this.setState({
      height,
      y,
    });
  }

  componentDidUpdate() {
    const { height, y } = this.props;
    d3.select(this.rect.current)
      .transition()
      .duration(1000)
      .attr('height', height)
      .attr('y', y)
      .on('end', () => this.setState({ height, y }));
  }
}

class HistogramChartFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      histo: 'favorites',
    };
    this._xAxis = this._xAxis.bind(this);
    this._histoData = this._histoData.bind(this);
    this._toggleHisto = this._toggleHisto.bind(this);
  }

  render() {
    const { _xAxis, _histoData, _xScale, _yScale, _toggleHisto } = this;
    const { histo, data } = this.state;
    return (
      <Svg className="__Histo">
        <g transform="translate(40, 40)">
          <g ref={_xAxis} className="axis" transform="translate(0, 400)" />
          {data.length > 0 &&
            _histoData(d => d[histo].length).map(obj => (
              // <rect
              <HistoRect
                key={obj.x0}
                className="__Histo_Rect"
                x={_xScale()(obj.x0)}
                y={_yScale()(obj.length)}
                width={_xScale()(obj.x1 - obj.x0) - 2}
                height={400 - _yScale()(obj.length)}
                onClick={_toggleHisto}
              />
            ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    d3.json('/tweets.json')
      .then(res => this.setState({ data: res.tweets }))
      .catch(() => this.setState({ data: [] }));
  }

  _xScale() {
    return d3
      .scaleLinear()
      .domain([0, 5])
      .range([0, 500]);
  }

  _yScale() {
    return d3
      .scaleLinear()
      .domain([0, 10])
      .range([400, 0]);
  }

  _xAxis(el) {
    const { _xScale } = this;
    const xAxis = d3
      .axisBottom()
      .scale(_xScale())
      .ticks(5);
    d3.select(el).call(xAxis);
    d3.select('g.axis')
      .selectAll('text')
      .attr('dx', 50)
      .style('display', d => d === 5 && 'none');
  }

  _histoData(valueFunc) {
    const { _xScale } = this;
    const { data } = this.state;
    return d3
      .histogram()
      .domain(_xScale().domain())
      .value(valueFunc)(data);
  }

  _toggleHisto() {
    this.setState(prevState => ({
      histo: prevState.histo === 'favorites' ? 'retweets' : 'favorites',
    }));
  }
}

export default HistogramChartFive;
