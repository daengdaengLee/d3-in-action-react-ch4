import React, { Component } from 'react';
import styled from 'styled-components';
import sitestatsJSON from 'assets/resources/sitestats';

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Svg = styled.svg`
  height: 600px;
`;

const Textarea = styled.textarea`
  height: 500px;
`;

class SankeyChartFive extends Component {
  render() {
    return (
      <Container>
        <Textarea disabled>{JSON.stringify(sitestatsJSON, null, 2)}</Textarea>
        <Svg>hi</Svg>
      </Container>
    );
  }
}

export default SankeyChartFive;
