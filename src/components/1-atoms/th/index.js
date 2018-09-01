import React from 'react';
import styled from 'styled-components';

const Cell = styled.th`
  background-color: #f4f4f4;
  padding: 8px 20px;
`;

const Th = ({ children }) => <Cell>{children}</Cell>;

export default Th;
