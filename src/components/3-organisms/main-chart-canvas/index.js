import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import ScatterChart from 'components/2-molecules/scatter-chart';
import BoxplotChart from 'components/2-molecules/boxplot-chart';
import LineChart from 'components/2-molecules/line-chart';
import StreamChart from 'components/2-molecules/stream-chart';
import HistogramChartFive from 'components/2-molecules/histogram-chart-five';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainChartCanvas = () => (
  <CanvasContainer>
    <Route path="/4/scatter" component={ScatterChart} />
    <Route path="/4/boxplot" component={BoxplotChart} />
    <Route path="/4/linechart" component={LineChart} />
    <Route path="/4/streamchart" component={StreamChart} />
    <Route path="/5/histogram" component={HistogramChartFive} />
  </CanvasContainer>
);

export default MainChartCanvas;
