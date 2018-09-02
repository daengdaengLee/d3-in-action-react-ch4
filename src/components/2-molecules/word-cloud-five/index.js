import React, { Component } from 'react';
import styled from 'styled-components';
import { scaleLinear, csvParse } from 'd3';
import cloud from 'd3-cloud';
import CSVTable from 'components/2-molecules/csv-table';
import worddataCSV from 'assets/resources/worddata';

const Container = styled.div`
  width: 100%;
  height: 99%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Svg = styled.svg`
  min-height: 800px;
`;

class WordCloudFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: csvParse(worddataCSV),
      keywords: ['layout', 'zoom', 'circle', 'style', 'append', 'attr'],
    };
  }
  render() {
    const { _cloud, _wordScale, _randomRotate } = this;
    const wordScale = _wordScale();
    const randomRotate = _randomRotate();
    const { data, keywords } = this.state;
    const cloud = _cloud(data, wordScale, randomRotate);
    const words = cloud.words();
    return (
      <Container>
        <Svg>
          <g className="wordCloudG" transform="translate(300, 300)">
            {words.map(word => (
              <text
                key={word.text}
                fontSize={`${word.size}px`}
                opacity="0.75"
                textAnchor="middle"
                transform={`translate(${word.x}, ${word.y})rotate(${
                  word.rotate
                })`}
                fill={keywords.includes(word.text) ? 'red' : 'black'}
              >
                {word.text}
              </text>
            ))}
          </g>
        </Svg>
        <CSVTable csv={worddataCSV} />
      </Container>
    );
  }

  _wordScale() {
    return scaleLinear()
      .domain([0, 75])
      .range([10, 160]);
  }

  _randomRotate() {
    return scaleLinear()
      .domain([0, 1])
      .range([-20, 20]);
  }

  _cloud(data, wordScale, randomRotate) {
    return (
      cloud()
        .size([650, 650])
        .words(data)
        // .rotate(() => randomRotate(Math.random()))
        .rotate(d => (d.text.length > 5 ? 0 : 90))
        .fontSize(d => wordScale(parseInt(d.frequency, 10)))
        .start()
    );
  }
}

export default WordCloudFive;
