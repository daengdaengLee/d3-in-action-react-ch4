import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainChartCanvas = () => (
  <CanvasContainer>
    <Route path="/scatter" render={() => 'hi'} />
  </CanvasContainer>
);

export default MainChartCanvas;
