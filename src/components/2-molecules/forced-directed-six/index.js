import React, { Component } from 'react';
import { csvParse } from 'd3';
import nodelistCSV from 'assets/resources/nodelist';
import edgelistCSV from 'assets/resources/edgelist';

class ForcedDirectedSix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: csvParse(nodelistCSV),
      edges: csvParse(edgelistCSV),
    };
  }

  render() {
    return <div>Hello Forced Directed Layout</div>;
  }
}

export default ForcedDirectedSix;
