import React from 'react';
import styled from 'styled-components';

const Cell = styled.td`
  background-color: #ffffff;
  padding: 8px 20px;
  border-bottom: 1px solid black;
  box-sizing: border-box;
`;

const Td = ({ children }) => <Cell>{children}</Cell>;

export default Td;
