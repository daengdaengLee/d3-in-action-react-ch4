import React from 'react';
import Th from '../../1-atoms/th';
import Td from '../../1-atoms/td';

const parseCSV = csv =>
  csv.split('\n').map(row => row.split(',').map(str => str.trim()));

const CSVTable = ({ csv }) => {
  const csvList = parseCSV(csv);
  const head = csvList[0];
  const body = csvList.slice(1);
  return (
    <table>
      <thead>
        <tr>
          {head.map((str, i) => (
            <Th key={i}>{str}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, i) => (
          <tr key={i}>
            {row.map((str, j) => (
              <Td key={j}>{str}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CSVTable;
