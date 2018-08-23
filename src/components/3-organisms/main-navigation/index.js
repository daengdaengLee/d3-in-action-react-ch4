import React from 'react';
import styled from 'styled-components';
import RouterLink from 'components/1-atoms/router-link';

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

const MainNavigation = ({ page }) => (
  <Nav>
    <List>
      <ListItem>
        <RouterLink to="/scatter" isCurrent={page === 'scatter'}>
          4-Scatter
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink to="/boxplot" isCurrent={page === 'boxplot'}>
          4-Boxplot
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink to="/linechart" isCurrent={page === 'linechart'}>
          4-Linechart
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink to="/streamchart" isCurrent={page === 'streamchart'}>
          4-Streamchart
        </RouterLink>
      </ListItem>
    </List>
  </Nav>
);

export default MainNavigation;
