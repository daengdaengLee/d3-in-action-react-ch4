import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import ScatterChartFour from 'components/2-molecules/scatter-chart-four';
import BoxplotChartFour from 'components/2-molecules/boxplot-chart-four';
import LineChartFour from 'components/2-molecules/line-chart-four';
import StreamChartFour from 'components/2-molecules/stream-chart-four';
import HistogramChartFive from 'components/2-molecules/histogram-chart-five';
import PieChartFive from 'components/2-molecules/pie-chart-five';
import CirclePackFive from 'components/2-molecules/circle-pack-five';
import TreeChartFive from 'components/2-molecules/tree-chart-five';
import RadialTreeFive from 'components/2-molecules/radial-tree-five';
import StackChartFive from 'components/2-molecules/stack-chart-five';
import StackBarFive from 'components/2-molecules/stack-bar-five';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainChartCanvas = () => (
  <CanvasContainer>
    <Route path="/4/scatter" component={ScatterChartFour} />
    <Route path="/4/boxplot" component={BoxplotChartFour} />
    <Route path="/4/linechart" component={LineChartFour} />
    <Route path="/4/streamchart" component={StreamChartFour} />
    <Route path="/5/histogram" component={HistogramChartFive} />
    <Route path="/5/pie" component={PieChartFive} />
    <Route path="/5/circlepack" component={CirclePackFive} />
    <Route path="/5/tree" component={TreeChartFive} />
    <Route path="/5/radial-tree" component={RadialTreeFive} />
    <Route path="/5/stack" component={StackChartFive} />
    <Route path="/5/stack-bar" component={StackBarFive} />
  </CanvasContainer>
);

export default MainChartCanvas;
