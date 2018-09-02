import React, { Component } from 'react';
import styled from 'styled-components';
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

class AdjacencyMatrixSix extends Component {
  render() {
    return (
      <Container>
        <Svg>hi</Svg>
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

export default AdjacencyMatrixSix;
