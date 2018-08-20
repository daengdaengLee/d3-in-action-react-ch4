import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import ScatterChart from 'components/2-molecules/scatter-chart';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainChartCanvas = () => (
  <CanvasContainer>
    <Route path="/scatter" component={ScatterChart} />
  </CanvasContainer>
);

export default MainChartCanvas;
