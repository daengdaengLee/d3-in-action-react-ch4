import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const RouterLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 0;
  flex-grow: 1;
  ${props =>
    props.active === 'true' &&
    css`
      background-color: gray;
    `} &:hover {
    background-color: gray;
  }
`;

export default ({ to, isCurrent, children }) => (
  <RouterLink to={to} active={`${isCurrent}`}>
    {children}
  </RouterLink>
);
