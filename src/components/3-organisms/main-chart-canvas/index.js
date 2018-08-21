import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import ScatterChart from 'components/2-molecules/scatter-chart';
import BoxplotChart from 'components/2-molecules/boxplot-chart';
import LineChart from 'components/2-molecules/line-chart';
import StreamChart from 'components/2-molecules/stream-chart';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainChartCanvas = () => (
  <CanvasContainer>
    <Route path="/scatter" component={ScatterChart} />
    <Route path="/boxplot" component={BoxplotChart} />
    <Route path="/linechart" component={LineChart} />
    <Route path="/streamchart" component={StreamChart} />
  </CanvasContainer>
);

export default MainChartCanvas;
