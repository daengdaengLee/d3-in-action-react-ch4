import React from 'react';
import Th from '../../1-atoms/th';
import Td from '../../1-atoms/td';

const parseJSON = json => {
  const columns = Object.keys(json[0]);
  const parsed = json.map(obj => columns.map(col => obj[col]));
  parsed.columns = columns;
  return parsed;
};

const JSONTable = ({ json }) => {
  const parsed = parseJSON(json);
  return (
    <table>
      <thead>
        <tr>
          {parsed.columns.map((v, i) => (
            <Th key={i}>{v}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {parsed.map((row, i) => (
          <tr key={i}>
            {row.map((v, j) => (
              <Td key={j}>{v}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JSONTable;
