import React, { Component } from 'react';
import styled from 'styled-components';
import { csvParse, line, curveBasis } from 'd3';
import _ from 'underscore';
import CSVTable from 'components/2-molecules/csv-table';
import nodelistCSV from 'assets/resources/nodelist.js';
import edgelistCSV from 'assets/resources/edgelist.js';

const _convertNodes = nodes =>
  _.map(nodes, (node, idx) => ({
    ...node,
    x: parseInt(idx, 10) * 40,
  }));

const _convertEdges = (edges, findNodeById) =>
  _.map(edges, edge => {
    const source = findNodeById(edge.source);
    const target = findNodeById(edge.target);
    return {
      id: `${source.id}-${target.id}`,
      weight: parseInt(edge.weight, 10),
      source,
      target,
    };
  });

const _makeFindNodeById = nodes => id => _.find(nodes, node => node.id === id);

const _createArcDiagram = (_nodes, _edges) => {
  const nodes = _convertNodes(_nodes);
  const findNodeById = _makeFindNodeById(nodes);
  const edges = _convertEdges(_edges, findNodeById);
  return { nodes, edges };
};

const _arc = edge => {
  const draw = line().curve(curveBasis);
  const midX = (edge.source.x + edge.target.x) / 2;
  const midY = (edge.source.x - edge.target.x) * 2;
  return draw([[edge.source.x, 0], [midX, midY], [edge.target.x, 0]]);
};

const Container = styled.div`
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Svg = styled.svg`
  width: 100%;
  min-height: 600px;
`;

const Tables = styled.div`
  display: flex;
  width: 100%;
`;

const Table = styled.div`
  width: 0;
  flex-grow: 1;
  padding: 8px;
`;

class ArcDiagramSix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: csvParse(nodelistCSV),
      edges: csvParse(edgelistCSV),
    };
  }

  render() {
    const { nodes: _nodes, edges: _edges } = this.state;
    const { nodes, edges } = _createArcDiagram(_nodes, _edges);
    return (
      <Container>
        <Svg>
          <g className="arcG" transform="translate(50, 250)">
            {edges.map(edge => (
              <path
                key={edge.id}
                className="arc"
                strokeWidth={edge.weight * 2}
                opacity="0.25"
                d={_arc(edge)}
                stroke="black"
                fill="none"
              />
            ))}
            {nodes.map(node => (
              <circle
                key={node.id}
                className="node"
                r="10"
                cx={node.x}
                fill="lightgray"
                stroke="black"
                strokeWidth="1px"
              />
            ))}
          </g>
        </Svg>
        <Tables>
          <Table>
            <h3>Node List</h3>
            <CSVTable
              csv={nodelistCSV}
              style={{ width: '100%', height: '100%' }}
            />
          </Table>
          <Table>
            <h3>Edge List</h3>
            <CSVTable
              csv={edgelistCSV}
              style={{ width: '100%', height: '100%' }}
            />
          </Table>
        </Tables>
      </Container>
    );
  }
}

export default ArcDiagramSix;
