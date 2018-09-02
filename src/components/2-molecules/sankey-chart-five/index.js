import React, { Component } from 'react';
import styled from 'styled-components';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import * as d3 from 'd3';
import _ from 'underscore';
import sitestatsJSON from 'assets/resources/sitestats';

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Svg = styled.svg`
  width: 100%;
  height: 800px;
  min-height: 800px;
`;

const Textarea = styled.textarea`
  height: 500px;
  min-height: 500px;
`;

class SankeyChartFive extends Component {
  render() {
    const { _sankey, _intensityRamp, _onMouseOut, _onMouseOver } = this;
    const strJSON = JSON.stringify(sitestatsJSON, null, 2);
    const { nodes, links } = sitestatsJSON;
    const sankey = _sankey(nodes, links);
    const intensityRamp = _intensityRamp(_.max(links, obj => obj.value).value);
    return (
      <Container>
        <Textarea disabled value={strJSON} />
        <Svg>
          <g transform="translate(20, 20)" className="sankeyG">
            {sankey.links.sort((a, b) => b.width - a.width).map(link => (
              <path
                key={link.index}
                d={sankeyLinkHorizontal()(link)}
                strokeWidth={link.width}
                strokeOpacity="0.5"
                fill="none"
                stroke={intensityRamp(link.value)}
                onMouseOver={_onMouseOver}
                onMouseOut={_onMouseOut}
              />
            ))}
            {sankey.nodes.map(node => (
              <g
                key={node.index}
                className="node"
                transform={`translate(${node.x0}, ${node.y0})`}
              >
                <rect
                  width={Math.abs(node.x0 - node.x1)}
                  height={Math.abs(node.y0 - node.y1)}
                  fill="pink"
                  stroke="gray"
                />
                <text
                  x="0"
                  y={Math.abs(node.y0 - node.y1) / 2}
                  textAnchor="middle"
                >
                  {node.name}
                </text>
              </g>
            ))}
          </g>
        </Svg>
      </Container>
    );
  }

  _sankey(nodes, links) {
    return sankey()
      .nodeWidth(20)
      .nodePadding(200)
      .size([460, 460])
      .nodes(nodes)
      .links(links)
      .iterations(200)();
  }

  _intensityRamp(domainMax) {
    return d3
      .scaleLinear()
      .domain([0, domainMax])
      .range(['black', 'red']);
  }

  _onMouseOver(event) {
    event.target.style.strokeOpacity = '0.8';
  }

  _onMouseOut(event) {
    event.target.style.strokeOpacity = '0.5';
  }
}

export default SankeyChartFive;
