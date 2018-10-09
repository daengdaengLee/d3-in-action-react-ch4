import React, { Component } from 'react';
import {
  csvParse,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  selectAll,
  select,
} from 'd3';
import _ from 'underscore';
import CSVTable from 'components/2-molecules/csv-table';
import nodelistCSV from 'assets/resources/nodelist';
import edgelistCSV from 'assets/resources/edgelist';

function createForceLayout(_nodes, _edges, svg) {
  const nodes = _.map(
    _nodes,
    _.compose(
      _.clone,
      _.identity,
    ),
  );
  const nodeHash = _.indexBy(nodes, 'id');
  const edges = _.map(_edges, obj => ({
    ...obj,
    weight: parseInt(obj.weight, 10),
    source: nodeHash[obj.source],
    target: nodeHash[obj.target],
  }));
  const force = forceSimulation(nodes)
    .force('charge', forceManyBody().strength(-600))
    .force('links', forceLink(edges))
    .force('center', forceCenter(300, 500))
    .on('tick', forceTick);
  select(svg)
    .selectAll('line.link')
    .data(edges, d => `${d.source.id}-${d.target.id}`)
    .enter()
    .append('line')
    .attr('class', 'link')
    .style('stroke', 'black')
    .style('opacity', 0.5)
    .style('stroke-width', d => d.weight);
  const nodeEnter = select(svg)
    .selectAll('g.node')
    .data(nodes, _.property('id'))
    .enter()
    .append('g')
    .attr('class', 'node');
  nodeEnter
    .append('circle')
    .attr('r', 5)
    .style('fill', 'lightgray')
    .style('stroke', 'black')
    .style('stroke-width', '1px');
  nodeEnter
    .append('text')
    .style('text-anchor', 'middle')
    .attr('y', 15)
    .text(_.property('id'));
  function forceTick() {
    selectAll('line.link')
      .attr('x1', d => d.source.x)
      .attr('x2', d => d.target.x)
      .attr('y1', d => d.source.y)
      .attr('y2', d => d.target.y);
    selectAll('g.node').attr('transform', d => {
      const x = Math.max(5, Math.min(d.x, 800));
      const y = Math.max(5, Math.min(d.y, 1000));
      return `translate(${x}, ${y})`;
    });
    // selectAll('circle').attr('r', d => d.weight * 2);
  }

  select(svg)
    .append('defs')
    .append('marker')
    .attr('id', 'Triangle')
    .attr('refX', 12)
    .attr('refY', 6)
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('markerWidth', 12)
    .attr('markerHeight', 18)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0 0 12 6 0 12 3 6');
  selectAll('line').attr('marker-end', 'url(#Triangle)');
  return force;
}

class ForcedDirectedSix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: csvParse(nodelistCSV),
      edges: csvParse(edgelistCSV),
    };
    this._svg = React.createRef();
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '99%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <svg style={{ minHeight: '1000px', width: '100%' }} ref={this._svg} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: 0, flexGrow: 1, padding: '8px' }}>
            <CSVTable
              csv={nodelistCSV}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div style={{ width: 0, flexGrow: 1, padding: '8px' }}>
            <CSVTable
              csv={edgelistCSV}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { _svg } = this;
    const { nodes, edges } = this.state;
    createForceLayout(nodes, edges, _svg.current);
  }
}

export default ForcedDirectedSix;
