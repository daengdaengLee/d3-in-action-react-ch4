import React, { Component } from 'react';
import styled from 'styled-components';
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
  render() {
    return (
      <Container>
        <Svg>hi</Svg>
        <CSVTable csv={worddataCSV} />
      </Container>
    );
  }
}

export default WordCloudFive;
