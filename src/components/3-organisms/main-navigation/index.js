import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Nav = styled.nav`
  display: flex;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 0;
  flex-grow: 1;
`;

const ListItem = styled.li`
  height: 2rem;
  margin-bottom: 1rem;
  display: flex;
  padding-left: 0.8rem;
`;

const CustomLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 0;
  flex-grow: 1;
  ${props =>
    props.selected &&
    css`
      background-color: gray;
    `} &:hover {
    background-color: gray;
  }
`;

const MainNavigation = ({ page }) => (
  <Nav>
    <List>
      <ListItem>
        <CustomLink to="/scatter" selected={page === 'scatter'}>
          Scatter
        </CustomLink>
      </ListItem>
    </List>
  </Nav>
);

export default MainNavigation;
