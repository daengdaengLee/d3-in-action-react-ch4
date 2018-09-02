import React, { Component } from 'react';
import styled from 'styled-components';
import { csvParse, scaleOrdinal, axisTop, axisLeft, select } from 'd3';
import _ from 'underscore';
import CSVTable from 'components/2-molecules/csv-table';
import nodelistCSV from 'assets/resources/nodelist';
import edgelistCSV from 'assets/resources/edgelist';

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

const SIZE = 50;

class AdjacencyMatrixSix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: csvParse(nodelistCSV),
      edges: csvParse(edgelistCSV),
      clicked: '',
    };
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const {
      _createAdjacencyMatrix,
      _nameScale,
      _xAxis,
      _yAxis,
      _onClick,
      _calcHighlighted,
    } = this;
    const { nodes, edges, clicked } = this.state;
    const matrix = _createAdjacencyMatrix(nodes, edges);
    const nameScale = _nameScale(nodes);
    const xAxis = _xAxis(nameScale);
    const yAxis = _yAxis(nameScale);
    const highlighted = _calcHighlighted(matrix, clicked);
    return (
      <Container>
        <Svg>
          <text transform="translate(10, 40)">X: Target, Y: Source</text>
          <text transform="translate(180, 40)" fill="red">
            Click the grid!
          </text>
          <g transform="translate(100, 100)" className="adjacencyG">
            {matrix.map(grid => (
              <rect
                key={grid.id}
                className="grid"
                stroke="black"
                fill="red"
                strokeWidth={highlighted.includes(grid.id) ? '3px' : '1px'}
                width={SIZE}
                height={SIZE}
                x={grid.x * SIZE}
                y={grid.y * SIZE}
                fillOpacity={grid.weight * 0.2}
                onClick={() => _onClick(grid.id)}
              />
            ))}
            <g
              ref={el =>
                select(el)
                  .call(xAxis)
                  .selectAll('text')
                  .style('text-anchor', 'end')
                  .attr('transform', 'translate(12, -10)rotate(90)')
                  .style('font-size', '16px')
              }
            />
            <g
              ref={el =>
                select(el)
                  .call(yAxis)
                  .selectAll('text')
                  .attr('transform', 'translate(0, 25)')
                  .style('font-size', '16px')
              }
            />
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

  _onClick(id) {
    this.setState({ clicked: id });
  }

  _calcHighlighted(matrix, id) {
    return id.length === 0
      ? []
      : matrix
        .filter(grid => {
          const [source1, target1] = id.split('-');
          const [source2, target2] = grid.id.split('-');
          return source1 === source2 || target1 === target2;
        })
        .map(grid => grid.id);
  }

  _createAdjacencyMatrix(nodes, edges) {
    const edgeHash = edges.reduce(
      (acc, cur) => ({ ...acc, [`${cur.source}-${cur.target}`]: cur }),
      {},
    );
    const matrix = nodes.map((source, i) =>
      nodes.map((target, j) => {
        const id = `${source.id}-${target.id}`;
        const weight = edgeHash[id] ? parseInt(edgeHash[id].weight, 10) : 0;
        return { id, x: j, y: i, weight };
      }),
    );
    return _.flatten(matrix);
  }

  _nameScale(nodes) {
    return scaleOrdinal()
      .domain(nodes.map(node => node.id))
      .range([...Array(nodes.length)].map((v, i) => i * SIZE));
  }

  _xAxis(nameScale) {
    return axisTop()
      .scale(nameScale)
      .tickSize(4);
  }

  _yAxis(nameScale) {
    return axisLeft()
      .scale(nameScale)
      .tickSize(4);
  }
}

export default AdjacencyMatrixSix;
